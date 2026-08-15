<script setup lang="ts">
import { useI18n } from '../i18n'
import { plugins } from '../data/plugins'
import IconGlyph from './ui/IconGlyph.vue'
import CopyButton from './ui/CopyButton.vue'
import Reveal from './ui/Reveal.vue'

const { t, d } = useI18n()

/** The exact prompt a user pastes to their DSH agent (from each README). */
function agentPrompt(id: 'auxiliary' | 'buddy'): string {
  const pkg = plugins.find((p) => p.id === id)!
  return [
    `Install the ${pkg.name} plugin into the profile I specify (or ask me if I didn't name one). The npm package name is \`${pkg.name}\`; use the GitHub source \`github:dsh-plugins/${pkg.name}\`, or \`file:<path>\` for local development.`,
    '',
    'Steps:',
    `1. Add the plugin dependency: \`dsh plugin --profile <PROFILE> add ${pkg.name}\` (or the equivalent plugin-manager command for my profile).`,
    '2. Verify the plugin resolves and holds a built `lib/` directory (at least `lib/index.js` and `lib/client.js`). If the build artifacts are missing, run `npm run build` in the plugin directory and re-add.',
    '3. Do not start the profile — install and verify only, then report what you changed.',
  ].join('\n')
}
</script>

<template>
  <section id="install" class="section install">
    <div class="container">
      <Reveal>
        <div class="section-head">
          <p class="eyebrow">{{ t('install.eyebrow') }}</p>
          <h2 class="section-title">{{ t('install.title') }}</h2>
          <p class="section-lead">{{ t('install.lead') }}</p>
        </div>
      </Reveal>

      <div class="install-grid">
        <div class="install-codes">
          <Reveal v-for="(p, i) in plugins" :key="p.id" :delay="i * 110">
            <div class="code-card">
              <div class="code-head">
                <span class="code-name">
                  <IconGlyph name="box" :size="15" :stroke="1.8" />
                  {{ p.name }}
                </span>
                <span class="code-ver">{{ t('plugins.version') }}{{ p.version }}</span>
                <CopyButton class="code-copy" :text="agentPrompt(p.id)" />
              </div>
              <pre class="code-body"><code><span class="code-dim"># </span>{{ p.installCmd }}</code></pre>
            </div>
          </Reveal>
        </div>

        <Reveal :delay="160">
          <ol class="steps">
            <li v-for="(s, i) in d.install.steps" :key="i" class="step">
              <span class="step-num">{{ i + 1 }}</span>
              <div class="step-text">
                <strong>{{ s.title }}</strong>
                <span>{{ s.desc }}</span>
              </div>
            </li>
          </ol>
          <p class="install-note">
            <IconGlyph name="sparkle" :size="14" :stroke="1.8" />
            {{ t('install.note') }}
          </p>
        </Reveal>
      </div>
    </div>
  </section>
</template>

<style scoped>
.install {
  border-top: 1px solid var(--border);
}

.install-grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: var(--sp-7);
  align-items: start;
}

.install-codes {
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
}

.code-card {
  border-radius: var(--r-lg);
  background: oklch(0.13 0.035 265 / 0.9);
  border: 1px solid var(--border);
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

.code-head {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: 10px 14px;
  background: oklch(0.17 0.04 265 / 0.85);
  border-bottom: 1px solid var(--border);
}

.code-name {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--text-1);
}

.code-name :deep(svg) {
  color: var(--brand-3);
}

.code-ver {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--text-3);
}

.code-copy {
  margin-inline-start: auto;
}

.code-body {
  margin: 0;
  padding: var(--sp-5);
  font-family: var(--font-mono);
  font-size: var(--fs-code);
  line-height: 1.7;
  color: var(--text-1);
  overflow-x: auto;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.code-dim {
  color: var(--text-3);
  user-select: none;
}

/* steps */
.steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
}

.step {
  display: flex;
  gap: var(--sp-4);
  align-items: flex-start;
}

.step-num {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  flex: none;
  border-radius: var(--r-full);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  font-weight: 700;
  color: #c7d5ff;
  background: rgb(91 127 229 / 0.16);
  border: 1px solid rgb(91 127 229 / 0.32);
}

.step-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 2px;
}

.step-text strong {
  font-size: var(--fs-body);
  font-weight: 600;
  color: var(--text-1);
}

.step-text span {
  font-size: var(--fs-sm);
  color: var(--text-2);
  line-height: 1.6;
}

.install-note {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-top: var(--sp-6);
  padding: var(--sp-4);
  border-radius: var(--r-md);
  font-size: var(--fs-sm);
  line-height: 1.65;
  color: var(--text-2);
  background: oklch(0.13 0.03 265 / 0.6);
  border: 1px solid var(--border);
}

.install-note :deep(svg) {
  flex: none;
  margin-top: 2px;
  color: var(--warn);
}

@media (max-width: 900px) {
  .install-grid {
    grid-template-columns: 1fr;
  }
}
</style>
