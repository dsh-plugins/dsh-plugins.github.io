<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '../i18n'
import { plugins, type PluginId } from '../data/plugins'
import IconGlyph from './ui/IconGlyph.vue'
import DivingBuddy from './ui/DivingBuddy.vue'
import CopyButton from './ui/CopyButton.vue'
import Reveal from './ui/Reveal.vue'

const { t } = useI18n()

const activeTab = ref<PluginId>(plugins[0].id)

const cmd = (id: PluginId) =>
  plugins.find((p) => p.id === id)!.installCmd
</script>

<template>
  <section id="top" class="hero">
    <div class="hero-bg" aria-hidden="true">
      <div class="orb orb--indigo"></div>
      <div class="orb orb--violet"></div>
      <div class="orb orb--cyan"></div>
    </div>

    <div class="hero-inner container">
      <!-- status pill -->
      <Reveal>
        <div class="status-pill" role="status">
          <DivingBuddy :size="26" />
          <span class="status-pill__text">{{ t('hero.status') }}</span>
          <span class="status-pill__live"><i></i> live</span>
        </div>
      </Reveal>

      <!-- headline -->
      <Reveal :delay="90">
        <p class="eyebrow hero-eyebrow">{{ t('hero.eyebrow') }}</p>
        <h1 class="hero-title">
          {{ t('hero.titleA') }}
          <span class="hero-title__grad">DeepSeek Harness</span>
        </h1>
        <p class="hero-sub">{{ t('hero.titleB') }}</p>
        <p class="hero-lead">{{ t('hero.sub') }}</p>
      </Reveal>

      <!-- actions -->
      <Reveal :delay="180">
        <div class="hero-actions">
          <a class="btn btn--primary" href="#plugins">
            {{ t('hero.ctaPlugins') }}
            <IconGlyph name="arrow" :size="15" :stroke="2" class="btn-icon" />
          </a>
          <a class="btn btn--ghost" href="https://github.com/dsh-plugins" target="_blank" rel="noopener">
            <IconGlyph name="github" :size="15" :stroke="2" class="btn-icon" />
            {{ t('hero.ctaGithub') }}
          </a>
        </div>
      </Reveal>

      <!-- terminal -->
      <Reveal :delay="260">
        <div class="terminal">
          <div class="terminal-bar">
            <div class="terminal-dots" aria-hidden="true">
              <i></i><i></i><i></i>
            </div>
            <div class="terminal-tabs" role="tablist">
              <button
                v-for="p in plugins"
                :key="p.id"
                type="button"
                class="terminal-tab"
                :class="{ 'terminal-tab--active': activeTab === p.id }"
                role="tab"
                :aria-selected="activeTab === p.id"
                @click="activeTab = p.id"
              >
                {{ p.name }}
              </button>
            </div>
            <CopyButton class="terminal-copy" :text="cmd(activeTab)" />
          </div>
          <div class="terminal-body">
            <p class="terminal-line">
              <span class="terminal-prompt">$</span>
              <span class="terminal-cmd">{{ cmd(activeTab) }}</span>
            </p>
            <p class="terminal-line terminal-line--dim">
              <span class="terminal-prompt">✓</span>
              <span>{{ t('hero.terminal.line1') }}</span>
            </p>
            <p class="terminal-line terminal-line--dim">
              <span class="terminal-prompt">✓</span>
              <span>{{ t('hero.terminal.line2') }}</span>
            </p>
            <p class="terminal-caret" aria-hidden="true"></p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding-top: calc(var(--nav-h) + var(--sp-8));
  padding-bottom: var(--sp-8);
  overflow: clip;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.5;
}

.orb--indigo {
  width: 560px;
  height: 560px;
  left: -160px;
  top: -120px;
  background: radial-gradient(circle, rgb(91 127 229 / 0.5), transparent 70%);
  animation: drift 16s ease-in-out infinite alternate;
}

.orb--violet {
  width: 520px;
  height: 520px;
  right: -140px;
  top: -60px;
  background: radial-gradient(circle, rgb(139 92 246 / 0.42), transparent 70%);
  animation: drift 20s ease-in-out infinite alternate-reverse;
}

.orb--cyan {
  width: 420px;
  height: 420px;
  left: 42%;
  bottom: -220px;
  background: radial-gradient(circle, rgb(34 211 238 / 0.2), transparent 70%);
  animation: drift 24s ease-in-out infinite alternate;
}

@keyframes drift {
  from { transform: translate3d(0, 0, 0) scale(1); }
  to { transform: translate3d(40px, 24px, 0) scale(1.08); }
}

.hero-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* status pill */
.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px 8px 10px;
  border-radius: var(--r-full);
  background: oklch(0.14 0.04 265 / 0.7);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-card);
  margin-bottom: var(--sp-6);
  font-size: var(--fs-xs);
}

.status-pill__text {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--text-2);
  letter-spacing: 0.02em;
}

.status-pill__live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--ok);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding-left: 10px;
  border-left: 1px solid var(--border);
}

.status-pill__live i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--ok);
  box-shadow: 0 0 8px var(--ok);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(0.82); }
}

/* headline */
.hero-eyebrow {
  justify-content: center;
}

.hero-eyebrow::after {
  content: '';
  width: 18px;
  height: 1px;
  background: currentColor;
  opacity: 0.6;
}

.hero-title {
  font-size: var(--fs-display);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text-1);
}

.hero-title__grad {
  background: var(--grad-text);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  white-space: nowrap;
}

.hero-sub {
  margin-top: var(--sp-4);
  font-size: clamp(1.15rem, 2vw, 1.5rem);
  font-weight: 600;
  color: var(--text-2);
  letter-spacing: -0.01em;
}

.hero-lead {
  margin-top: var(--sp-5);
  margin-inline: auto;
  max-width: 60ch;
  text-align: center;
  color: var(--text-2);
  font-size: calc(var(--fs-body) + 1px);
  text-wrap: balance;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--sp-3);
  margin-top: var(--sp-7);
}

/* terminal */
.terminal {
  width: min(680px, 100%);
  margin-inline: auto;
  margin-top: var(--sp-8);
  text-align: start;
  border-radius: var(--r-lg);
  background: oklch(0.13 0.035 265 / 0.9);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-float), 0 0 0 1px oklch(0.9 0.08 265 / 0.06) inset;
  overflow: hidden;
}

.terminal-bar {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: 10px 14px;
  background: oklch(0.17 0.04 265 / 0.85);
  border-bottom: 1px solid var(--border);
}

.terminal-dots {
  display: flex;
  gap: 6px;
  flex: none;
}

.terminal-dots i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: oklch(0.55 0.09 265 / 0.9);
}

.terminal-dots i:nth-child(2) {
  background: oklch(0.7 0.12 300 / 0.9);
}

.terminal-dots i:nth-child(3) {
  background: oklch(0.75 0.1 190 / 0.9);
}

.terminal-tabs {
  display: flex;
  gap: 4px;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;
}

.terminal-tabs::-webkit-scrollbar {
  display: none;
}

.terminal-tab {
  padding: 5px 12px;
  border-radius: var(--r-sm);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--text-3);
  white-space: nowrap;
  transition: color var(--dur-fast) var(--ease-out), background-color var(--dur-fast) var(--ease-out);
}

.terminal-tab:hover {
  color: var(--text-2);
}

.terminal-tab--active {
  color: var(--text-1);
  background: oklch(0.28 0.06 265 / 0.6);
}

.terminal-copy {
  margin-inline-start: auto;
  flex: none;
}

.terminal-body {
  padding: var(--sp-5) var(--sp-5) var(--sp-6);
  font-family: var(--font-mono);
  font-size: var(--fs-code);
}

.terminal-line {
  display: flex;
  gap: 10px;
  align-items: baseline;
  line-height: 1.9;
  overflow-wrap: anywhere;
}

.terminal-prompt {
  flex: none;
  color: var(--brand-3);
  font-weight: 700;
  user-select: none;
}

.terminal-cmd {
  color: var(--text-1);
  font-weight: 500;
}

.terminal-line--dim {
  color: var(--text-3);
}

.terminal-line--dim .terminal-prompt {
  color: var(--ok);
}

.terminal-caret {
  width: 9px;
  height: 16px;
  margin-top: var(--sp-3);
  background: var(--brand-3);
  opacity: 0.8;
  animation: blink 1.1s steps(2) infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

@media (max-width: 560px) {
  .hero {
    padding-top: calc(var(--nav-h) + var(--sp-6));
  }

  .hero-title__grad {
    white-space: normal;
  }
}
</style>
