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
