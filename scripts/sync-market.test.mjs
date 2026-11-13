import assert from 'node:assert/strict';
import { test } from 'node:test';
import { generateIndex } from './sync-market.mjs';

const plugin = {
  id: '@foo/bar', name: 'Foo', support_versions: '[0.1.0-rc.6,0.2.0-rc.1);[0.2.1-rc.4,)',
  description: [{ language: 'en-US', content: 'Example' }, { language: 'zh-CN', content: '示例' }],
  urls: { repository: 'https://github.com/foo/bar' },
};
const bundle = (version) => ({ name: plugin.id, version, dsh: { bundle: { patch: './cordis.patch.yml' } } });

function fixture({ npmMissing = false, nextMissing = false, badBundle = false, invalidCommit = false } = {}) {
  const requests = [];
  const request = async (url) => {
    requests.push(url);
    if (url.startsWith('https://registry.npmjs.org/')) {
      return npmMissing ? null : {
        'dist-tags': { latest: '1.0.0', ...(!nextMissing ? { next: '1.1.0-rc.1' } : {}) },
        versions: { '1.0.0': bundle('1.0.0'), '1.1.0-rc.1': bundle('1.1.0-rc.1') },
        time: { '1.0.0': '2026-01-01T00:00:00Z', '1.1.0-rc.1': '2026-01-02T00:00:00Z' },
      };
    }
    if (url.includes('/tags?')) {
      return ['1.0.0', '1.2.0-rc.1'].map((version) => ({ name: `v${version}`, commit: { sha: invalidCommit ? 'main' : (version === '1.0.0' ? 'a' : 'b').repeat(40) } }));
    }
    if (url.includes('raw.githubusercontent.com')) {
      return badBundle ? { name: plugin.id, version: '1.0.0' }
        : bundle(url.includes('a'.repeat(40)) ? '1.0.0' : '1.2.0-rc.1');
    }
    if (url.includes('/commits/')) {
      return { commit: { committer: { date: '2026-01-03T00:00:00Z' } } };
    }
    throw new Error(`意外请求 ${url}`);
  };
  return { request, requests, progress: () => {} };
}

test('双渠道去重优先 npm，并保留 GitHub 独有预发布版本', async () => {
  const index = await generateIndex([plugin], fixture());
  const entry = index.plugins[0];
  assert.deepEqual(entry.versions.map((v) => v.version), ['1.2.0-rc.1', '1.1.0-rc.1', '1.0.0']);
  assert.equal(entry.versions[2].source.type, 'npm');
  assert.equal(entry.versions[0].source.commit, 'b'.repeat(40));
  assert.equal(entry.versions[0].publishTimestamp, Date.parse('2026-01-03T00:00:00Z') / 1000);
  assert.equal(entry.versions[2].publishTimestamp, Date.parse('2026-01-01T00:00:00Z') / 1000);
  assert.equal(entry.versions[0].engines.dsh, '>=0.1.0-rc.6 <0.2.0-rc.1 || >=0.2.1-rc.4');
  assert.equal(entry.description.en, 'Example');
  assert.equal(entry.description['zh-cn'], '示例');
  assert.equal(entry.description.zh, '示例');
});

test('缺失 npm 包或 next 标签时仍收录有效的 GitHub 版本', async () => {
  const gitOnly = await generateIndex([plugin], fixture({ npmMissing: true }));
  assert.equal(gitOnly.plugins[0].versions.length, 2);
  assert.ok(gitOnly.plugins[0].versions.every((v) => v.source.type === 'git'));
  const noNext = await generateIndex([plugin], fixture({ nextMissing: true }));
  assert.equal(noNext.plugins[0].versions.length, 2);
});

test('包身份、完整提交和请求失败会阻止目录生成', async () => {
  await assert.rejects(generateIndex([plugin], fixture({ badBundle: true })), /dsh.bundle.patch/);
  await assert.rejects(generateIndex([plugin], fixture({ invalidCommit: true })), /完整提交/);
  await assert.rejects(generateIndex([plugin], { request: async () => { throw new Error('HTTP 503'); }, progress: () => {} }), /HTTP 503/);
});

test('非法范围包含插件和字段位置', async () => {
  await assert.rejects(generateIndex([{ ...plugin, support_versions: '[2.0.0,1.0.0]' }], fixture()), /@foo\/bar.support_versions/);
});

test('可选描述缺失时省略字段并通过官方校验', async () => {
  const { description, ...withoutDescription } = plugin;
  const index = await generateIndex([withoutDescription], fixture());
  assert.equal(Object.hasOwn(index.plugins[0], 'description'), false);
});

test('中文别名保留显式 zh，字符串和无中文描述保持原义', async () => {
  for (const description of [
    [{ language: 'ZH-cn', content: '区域中文' }, { language: 'zh', content: '明确中文' }, { language: 'en-US', content: 'English' }],
    [{ language: 'en-US', content: 'English' }],
    '普通描述',
  ]) {
    const { plugins: [entry] } = await generateIndex([{ ...plugin, description }], fixture());
    if (typeof description === 'string') {
      assert.equal(entry.description, description);
    } else {
      assert.equal(entry.description.zh, description.length > 1 ? '明确中文' : undefined);
      assert.equal(entry.description.en, 'English');
    }
  }
});

function metadataFixture({ nextMissing = false, manifest = {}, files, locales = {} } = {}) {
  const data = fixture({ nextMissing });
  const baseRequest = data.request;
  data.request = async (url) => {
    if (url.startsWith('https://registry.npmjs.org/')) {
      const pack = await baseRequest(url);
      for (const value of Object.values(pack.versions)) {
        Object.assign(value, manifest);
      }
      return pack;
    }
    if (url.startsWith('https://data.jsdelivr.com/')) {
      data.requests.push(url);
      return { files: files ?? [
        { name: '/locale/en.json', size: 100 },
        { name: '/locale/zh-CN.json', size: 100 },
        { name: '/icon.svg', size: 200 },
      ] };
    }
    if (url.startsWith('https://cdn.jsdelivr.net/')) {
      data.requests.push(url);
      const path = new URL(url).pathname.split('/').slice(4).join('/');
      return locales[path] ?? { meta: { title: path.includes('en.json') ? 'Example title' : '中文名称' } };
    }
    return baseRequest(url);
  };
  return data;
}

const resourceManifest = { exports: { './locale/*.json': './locale/*.json', './icon': './icon.svg' } };

test('从 next 精确版本导出的 locale 生成名称及图标地址', async () => {
  const data = metadataFixture({ manifest: resourceManifest });
  const { plugins: [entry] } = await generateIndex([plugin], data);
  assert.deepEqual(entry.title, { en: 'Example title', 'zh-cn': '中文名称', zh: '中文名称' });
  assert.equal(entry.icon, 'https://cdn.jsdelivr.net/npm/@foo/bar@1.1.0-rc.1/icon.svg');
  assert.equal(entry.description.zh, '示例');
  assert.ok(data.requests.filter((url) => url.includes('jsdelivr')).every((url) => url.includes('@1.1.0-rc.1/')));
});

test('缺少 next 使用 latest，顶层 icon 和精确 locale 导出优先', async () => {
  const data = metadataFixture({ nextMissing: true, manifest: {
    icon: 'icon.svg',
    exports: { './icon': './unused.svg', './locale/*.json': './locale/*.json', './locale/zh-CN.json': './custom/zh.json' },
  }, files: [
    { name: '/locale/en.json', size: 100 }, { name: '/locale/zh-CN.json', size: 100 },
    { name: '/custom/zh.json', size: 100 }, { name: '/icon.svg', size: 200 },
  ] });
  const { plugins: [entry] } = await generateIndex([plugin], data);
  assert.equal(entry.title.zh, '中文名称');
  assert.equal(entry.icon, 'https://cdn.jsdelivr.net/npm/@foo/bar@1.0.0/icon.svg');
  assert.ok(data.requests.some((url) => url.endsWith('/custom/zh.json')));
  assert.ok(!data.requests.some((url) => url.endsWith('/locale/zh-CN.json')));
});

test('无资源声明及 locale 无标题时保留描述符名称', async () => {
  const plain = await generateIndex([plugin], fixture());
  assert.equal(plain.plugins[0].title, plugin.name);
  assert.equal(Object.hasOwn(plain.plugins[0], 'icon'), false);
  const data = metadataFixture({ manifest: { exports: { './locale/en.json': './locale/en.json' } }, locales: { 'locale/en.json': { settings: {} } } });
  const index = await generateIndex([plugin], data);
  assert.equal(index.plugins[0].title, plugin.name);
});

test('拒绝越界资源、缺失文件、超限图标和非法标题', async () => {
  for (const icon of ['./../icon.svg', 'https://example.com/icon.svg', './icon.svg?x', './icon.txt']) {
    await assert.rejects(generateIndex([plugin], metadataFixture({ manifest: { icon } })), /资源|图标/);
  }
  await assert.rejects(generateIndex([plugin], metadataFixture({ manifest: resourceManifest, files: [] })), /缺失/);
  await assert.rejects(generateIndex([plugin], metadataFixture({ manifest: { icon: './icon.svg' }, files: [{ name: '/icon.svg', size: 262145 }] })), /超过/);
  await assert.rejects(generateIndex([plugin], metadataFixture({ manifest: resourceManifest, locales: { 'locale/en.json': { meta: { title: 42 } } } })), /meta.title/);
});

test('CDN 失败阻止生成，避免发布缺少元数据的目录', async () => {
  const data = metadataFixture({ manifest: resourceManifest });
  const request = data.request;
  data.request = (url) => {
    if (url.includes('jsdelivr')) {
      throw new Error('CDN HTTP 503');
    }
    return request(url);
  };
  await assert.rejects(generateIndex([plugin], data), /CDN HTTP 503/);
});

test('精确导出跨大小写优先，显式 zh 名称优先于 zh-cn 别名', async () => {
  const data = metadataFixture({ manifest: { exports: {
    './locale/*.json': './locale/*.json',
    './locale/zh-cn.json': './custom/zh.json',
    './locale/zh.json': './custom/base.json',
  } }, files: [
    { name: '/locale/en.json', size: 100 }, { name: '/locale/zh-CN.json', size: 100 },
    { name: '/custom/zh.json', size: 100 }, { name: '/custom/base.json', size: 100 },
  ], locales: {
    'custom/zh.json': { meta: { title: '精确导出' } },
    'custom/base.json': { meta: { title: '通用中文' } },
  } });
  const { plugins: [entry] } = await generateIndex([plugin], data);
  assert.equal(entry.title['zh-cn'], '精确导出');
  assert.equal(entry.title.zh, '通用中文');
  assert.ok(!data.requests.some((url) => url.endsWith('/locale/zh-CN.json')));
});

test('拒绝 locale 越界路径、通配不匹配及非法语言键', async () => {
  for (const exports of [
    { './locale/en.json': './../secret.json' },
    { './locale/*.json': './locale/en.json' },
    { './locale/*.json': './locale/*/*.json' },
    { './locale/__proto__.json': './locale/en.json' },
    { './locale/en_US.json': './locale/en.json' },
  ]) {
    await assert.rejects(generateIndex([plugin], metadataFixture({ manifest: { exports } })), /路径|语言键/);
  }
  await assert.rejects(generateIndex([{ ...plugin, description: [{ language: '__proto__', content: '非法' }] }], fixture()), /语言键/);
});

test('支持通配目标无后缀，并拒绝无效 CDN 文件列表', async () => {
  const data = metadataFixture({ manifest: { exports: { './locale/*.json': './translations/*' } },
    files: [{ name: '/translations/en', size: 100 }],
    locales: { 'translations/en': { meta: { title: 'Example' } } },
  });
  const index = await generateIndex([plugin], data);
  assert.equal(index.plugins[0].title.en, 'Example');
  const request = data.request;
  data.request = (url) => url.startsWith('https://data.jsdelivr.com/') ? { files: {} } : request(url);
  await assert.rejects(generateIndex([plugin], data), /文件列表无效/);
});
