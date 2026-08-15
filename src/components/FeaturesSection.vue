<script setup lang="ts">
import { useI18n } from '../i18n'
import IconGlyph from './ui/IconGlyph.vue'
import Reveal from './ui/Reveal.vue'

const { t, d } = useI18n()

const routes = [
  { icon: 'eye', key: 'vision', cfg: 'vision.model', theme: 'brand' },
  { icon: 'swap', key: 'handoff', cfg: 'vision.handoff: true', theme: 'cyan' },
  { icon: 'stack', key: 'compact', cfg: 'compact.model', theme: 'brand' },
  { icon: 'shield', key: 'approve', cfg: 'approve.model', theme: 'violet' },
  { icon: 'fork', key: 'subagent', cfg: 'subagent.model', theme: 'brand' },
  { icon: 'hash', key: 'title', cfg: 'title.model', theme: 'violet' },
  { icon: 'image', key: 'imagegen', cfg: 'imagegen.model', theme: 'cyan' },
  { icon: 'sparkle', key: 'marks', cfg: 'input: [text, image]', theme: 'brand' },
] as const

const flowLines = [
  { prompt: 'llm/stream', text: 'waterfall listener · always resident, pure pass-through' },
  { prompt: '├─ compact', text: "← purpose: 'compaction'" },
  { prompt: '├─ title', text: "← purpose: 'session-title'" },
  { prompt: '└─ approve', text: '← review contract · temp 0, no sessionId' },
  { prompt: 'main session', text: '→ pass-through · never rerouted · core untouched' },
]
</script>

<template>
  <section id="features" class="section features">
    <div class="container">
      <Reveal>
        <div class="section-head section-head--center">
          <p class="eyebrow">{{ t('features.eyebrow') }}</p>
          <h2 class="section-title">{{ t('features.title') }}</h2>
          <p class="section-lead">{{ t('features.lead') }}</p>
        </div>
      </Reveal>

      <div class="routes-grid">
        <Reveal v-for="(r, i) in routes" :key="r.key" :delay="(i % 4) * 70">
          <article class="route-card">
            <span class="route-icon" :class="`route-icon--${r.theme}`">
              <IconGlyph :name="r.icon" :size="16" :stroke="1.8" />
            </span>
            <h3 class="route-title">{{ d.plugins.auxiliary.features[i].title }}</h3>
            <p class="route-desc">{{ d.plugins.auxiliary.features[i].desc }}</p>
            <code class="route-cfg">{{ r.cfg }}</code>
          </article>
        </Reveal>
      </div>

      <Reveal :delay="120">
        <div class="how-card">
          <div class="how-text">
            <h3 class="how-title">
              <IconGlyph name="zap" :size="18" :stroke="1.8" />
              {{ t('features.how') }}
            </h3>
            <p class="how-desc">{{ t('features.howText') }}</p>
          </div>
          <div class="how-flow" role="img" :aria-label="t('features.how')">
            <p v-for="(l, i) in flowLines" :key="i" class="flow-line" :class="{ 'flow-line--dim': i > 0 }">
              <span class="flow-prompt">{{ l.prompt }}</span>
              <span class="flow-text">{{ l.text }}</span>
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
</template>

<style scoped>
.features {
  border-top: 1px solid var(--border);
  background: linear-gradient(180deg, transparent, oklch(0.1 0.03 265 / 0.55), transparent);
}

.routes-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--sp-4);
}

.route-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  padding: var(--sp-5);
  border-radius: var(--r-lg);
  background: oklch(0.14 0.035 265 / 0.75);
  border: 1px solid var(--border);
  transition: transform var(--dur-med) var(--ease-out), border-color var(--dur-med) var(--ease-out);
}

.route-card:hover {
  transform: translateY(-3px);
  border-color: var(--border-strong);
}

.route-icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: var(--r-sm);
}

.route-icon--brand {
  color: #aebfff;
  background: rgb(91 127 229 / 0.16);
}

.route-icon--cyan {
  color: #9fecfb;
  background: rgb(34 211 238 / 0.13);
}

.route-icon--violet {
  color: #d9c6ff;
  background: rgb(139 92 246 / 0.16);
}

.route-title {
  font-size: var(--fs-body);
  font-weight: 600;
  color: var(--text-1);
}

.route-desc {
  font-size: var(--fs-sm);
  line-height: 1.55;
  color: var(--text-2);
}

.route-cfg {
  margin-top: auto;
  padding: 5px 9px;
  border-radius: var(--r-xs);
  font-family: var(--font-mono);
  font-size: 0.74rem;
  color: var(--brand-3);
  background: oklch(0.09 0.02 265 / 0.7);
  border: 1px solid var(--border);
  overflow-wrap: anywhere;
}

/* how it works */
.how-card {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: var(--sp-7);
  align-items: center;
  margin-top: var(--sp-8);
  padding: var(--sp-7);
  border-radius: var(--r-xl);
  background: linear-gradient(135deg, oklch(0.15 0.045 265 / 0.9), oklch(0.12 0.03 290 / 0.9));
  border: 1px solid var(--border);
  box-shadow: var(--shadow-card);
}

.how-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: var(--fs-h3);
  font-weight: 700;
  color: var(--text-1);
}

.how-title :deep(svg) {
  color: var(--brand-3);
}

.how-desc {
  margin-top: var(--sp-4);
  color: var(--text-2);
  line-height: 1.7;
}

.how-flow {
  padding: var(--sp-5);
  border-radius: var(--r-lg);
  background: oklch(0.08 0.02 265 / 0.85);
  border: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  overflow-x: auto;
}

.flow-line {
  display: flex;
  gap: 12px;
  align-items: baseline;
  white-space: nowrap;
  line-height: 2;
}

.flow-prompt {
  flex: none;
  font-weight: 700;
  color: var(--text-1);
}

.flow-line--dim .flow-prompt {
  color: var(--brand-3);
  font-weight: 500;
}

.flow-line--dim {
  color: var(--text-3);
}

.flow-line:last-child .flow-prompt {
  color: var(--ok);
}

@media (max-width: 960px) {
  .routes-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .how-card {
    grid-template-columns: 1fr;
    gap: var(--sp-5);
    padding: var(--sp-6);
  }
}

@media (max-width: 520px) {
  .routes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
