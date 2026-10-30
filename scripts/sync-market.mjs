import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import semver from 'semver';
import { parseMarketIndex } from '@deepseek-ai/dsh-plugin-market-index';
import { normalizeRange, validateRelationship } from './version-range.mjs';

const sourceUrl = 'https://raw.githubusercontent.com/dsh-plugins/dsh-plugin-market/main/plugins.json';
const indexUrl = 'https://dsh-plug.in/api/dsh-plugins.json';

async function fetchJson(url, optional = false) {
  const headers = { 'User-Agent': 'dsh-plugins-market' };
  if (new URL(url).hostname === 'api.github.com' && process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(30000) });
  if (optional && response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`${url}: HTTP ${response.status}`);
  }
  return response.json();
}

function localizedDescription(value) {
  if (value === undefined || typeof value === 'string') {
    return value;
  }
  const result = {};
  for (const { language, content } of value) {
    result[language.toLowerCase()] = content;
  }
  result.en ??= result['en-us'] ?? Object.values(result)[0];
  return result;
}

function timestamp(value, context) {
  const seconds = Math.floor(Date.parse(value) / 1000);
  if (!Number.isInteger(seconds) || seconds < 0) {
    throw new Error(`${context}: 缺少有效发布时间`);
  }
  return seconds;
}

function assertBundle(manifest, name, version) {
  if (manifest.name !== name || manifest.version !== version || !manifest.dsh?.bundle?.patch) {
    throw new Error(`${name}@${version}: 包名、版本或 dsh.bundle.patch 与发布记录不一致`);
  }
}

async function npmVersions(plugin, request) {
  if (plugin.id.startsWith('github:')) {
    return { versions: [], directory: undefined };
  }
  const pack = await request(`https://registry.npmjs.org/${plugin.id}`, true);
  if (!pack) {
    return { versions: [], directory: undefined };
  }
  const versions = [];
  for (const tag of ['latest', 'next']) {
    const version = pack['dist-tags']?.[tag];
    if (!version || versions.some((entry) => entry.version === version)) {
      continue;
    }
    const manifest = pack.versions?.[version];
    if (!semver.valid(version) || !manifest) {
      throw new Error(`${plugin.id}: npm ${tag} 指向无效版本 ${version}`);
    }
    assertBundle(manifest, plugin.id, version);
    versions.push({
      version,
      publishTimestamp: timestamp(pack.time?.[version], `${plugin.id}@${version}`),
      source: { type: 'npm' },
    });
  }
  const latest = pack.versions?.[pack['dist-tags']?.latest];
  return { versions, directory: latest?.repository?.directory };
}

function githubRepository(plugin) {
  if (plugin.id.startsWith('github:')) {
    const match = /^github:([^/#]+\/[^/#]+)(?:#.*)?$/.exec(plugin.id);
    if (!match) {
      throw new Error(`${plugin.id}: 无效 GitHub 标识`);
    }
    return match[1];
  }
  if (!plugin.urls?.repository) {
    return null;
  }
  const url = new URL(plugin.urls.repository);
  return url.hostname === 'github.com' ? url.pathname.replace(/^\//, '').replace(/\.git\/?$/, '').replace(/\/$/, '') : null;
}

async function gitVersions(plugin, directory, request) {
  const repo = githubRepository(plugin);
  if (!repo) {
    return { name: plugin.id, versions: [] };
  }
  const tags = [];
  for (let page = 1; ; page += 1) {
    const batch = await request(`https://api.github.com/repos/${repo}/tags?per_page=100&page=${page}`);
    if (!Array.isArray(batch)) {
      throw new Error(`${repo}: GitHub 标签响应必须是数组`);
    }
    tags.push(...batch);
    if (batch.length < 100) {
      break;
    }
  }
  const sorted = tags.map((tag) => ({ ...tag, version: tag.name.replace(/^v/, '') }))
    .filter((tag) => semver.valid(tag.version))
    .sort((a, b) => semver.rcompare(a.version, b.version));
  const selected = [sorted.find((tag) => !semver.prerelease(tag.version)), sorted.find((tag) => semver.prerelease(tag.version))].filter(Boolean);
  let name = plugin.id.startsWith('github:') ? null : plugin.id;
  const versions = [];
  for (const tag of selected) {
    const commit = tag.commit?.sha;
    if (!/^[a-f0-9]{40}$/.test(commit ?? '')) {
      throw new Error(`${repo}/${tag.name}: 缺少完整提交哈希`);
    }
    const path = directory ? `${directory}/package.json` : 'package.json';
    const manifest = await request(`https://raw.githubusercontent.com/${repo}/${commit}/${path}`);
    name ??= manifest.name;
    assertBundle(manifest, name, tag.version);
    const details = await request(`https://api.github.com/repos/${repo}/commits/${commit}`);
    versions.push({
      version: tag.version,
      publishTimestamp: timestamp(details.commit?.committer?.date, `${repo}/${commit}`),
      source: { type: 'git', url: `https://github.com/${repo}`, commit, ...(directory ? { path: directory } : {}) },
    });
  }
  return { name, versions };
}

/** 同一份描述符生成两种目录；所有请求和校验完成后才能写入部署目录。 */
export async function generateIndex(plugins, { request = fetchJson, progress = console.log } = {}) {
  if (!Array.isArray(plugins)) {
    throw new Error('市场描述符必须是数组');
  }
  const entries = [];
  for (const [position, plugin] of plugins.entries()) {
    progress(`[${position + 1}/${plugins.length}] 正在读取 ${plugin.id}`);
    const range = normalizeRange(plugin.support_versions, `${plugin.id}.support_versions`);
    for (const [index, relation] of (plugin.relationship ?? []).entries()) {
      validateRelationship(relation, `${plugin.id}.relationship[${index}].versions`);
    }
    const npm = await npmVersions(plugin, request);
    const git = await gitVersions(plugin, npm.directory, request);
    const versions = new Map();
    for (const entry of [...npm.versions, ...git.versions]) {
      if (!versions.has(entry.version)) {
        versions.set(entry.version, { ...entry, engines: { dsh: range } });
      }
    }
    if (!versions.size) {
      throw new Error(`${plugin.id}: npm 和 GitHub 均无可收录的版本`);
    }
    entries.push({
      name: git.name ?? plugin.id,
      title: plugin.name,
      ...(plugin.description === undefined ? {} : { description: localizedDescription(plugin.description) }),
      ...(plugin.urls?.homepage ? { homepage: plugin.urls.homepage } : {}),
      ...(plugin.urls?.repository ? { repository: { url: plugin.urls.repository, ...(npm.directory ? { directory: npm.directory } : {}) } } : {}),
      versions: [...versions.values()].sort((a, b) => semver.rcompare(a.version, b.version)),
    });
  }
  const index = { format: 1, title: { en: 'DSH Plugins', 'zh-cn': 'DSH 插件市场' }, plugins: entries };
  parseMarketIndex(index, indexUrl);
  return index;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 0 && (args.length !== 2 || args[0] !== '--input')) {
    throw new Error('用法: pnpm sync:market [--input 本地聚合文件]');
  }
  const plugins = args.length ? JSON.parse(await readFile(resolve(args[1]), 'utf8')) : await fetchJson(sourceUrl);
  const index = await generateIndex(plugins);
  const output = resolve(dirname(fileURLToPath(import.meta.url)), '../public/api');
  await mkdir(output, { recursive: true });
  await writeFile(resolve(output, 'plugins.json'), `${JSON.stringify(plugins, null, 2)}\n`, 'utf8');
  await writeFile(resolve(output, 'dsh-plugins.json'), `${JSON.stringify(index, null, 2)}\n`, 'utf8');
  console.log(`已更新 ${index.plugins.length} 个插件的两种目录格式`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
