<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../i18n'
import type { PluginMeta } from '../data/plugins'
import IconGlyph from './ui/IconGlyph.vue'

const props = defineProps<{ plugin: PluginMeta }>()
const { t, d } = useI18n()

const dict = computed(() => (d.value.plugins as Record<string, any>)[props.plugin.id])

/** Per-plugin card icon name (falls back to the plugin name for the icon). */
const iconName = computed<string>(() => {
  const map: Record<string, string> = {
    auxiliary: 'stack',
    loader: 'box',
    approve: 'shield',
    review: 'chevron',
    sidebar: 'layout',
    buddy: 'robot',
    stable: 'hash',
  }
  return map[props.plugin.id] ?? 'plug'
})

const chipClass = computed<string>(() => `chip--${props.plugin.theme}`)
</script>

<template>
  <article
    class="plugin-card"
    :class="`plugin-card--${plugin.theme}`"
  >
    <header class="plugin-head">
      <div class="plugin-icon" :class="`plugin-icon--${plugin.theme}`">
        <IconGlyph :name="iconName" :size="22" :stroke="1.8" />
      </div>
      <div class="plugin-id">
        <h3 class="plugin-name">
          <span class="plugin-name__mono">{{ plugin.name }}</span>
        </h3>
        <p class="plugin-meta">
          <span class="chip" :class="chipClass">
            {{ plugin.language }}
          </span>
          <span class="chip">{{ plugin.license }}</span>
          <span class="chip chip--dot">{{ t('plugins.version') }}{{ plugin.version }}</span>
        </p>
      </div>
      <div class="plugin-links">
        <a class="icon-link" :href="plugin.repo" target="_blank" rel="noopener" :aria-label="`${plugin.name} — ${t('plugins.viewRepo')}`">
          <IconGlyph name="github" :size="17" :stroke="1.8" />
        </a>
        <a class="icon-link" :href="plugin.npm" target="_blank" rel="noopener" :aria-label="`${plugin.name} — npm`">
          <IconGlyph name="npm" :size="17" :stroke="1.8" />
        </a>
      </div>
    </header>

    <p class="plugin-tagline">{{ dict.tagline }}</p>
    <p class="plugin-desc">{{ dict.desc }}</p>

    <div class="plugin-features">
      <div v-for="f in dict.features" :key="f.title" class="plugin-feature">
        <span class="plugin-feature-icon" :class="`plugin-feature-icon--${plugin.theme}`">
          <IconGlyph :name="f.icon" :size="14" :stroke="1.8" />
        </span>
        <div class="plugin-feature-text">
          <strong>{{ f.title }}</strong>
          <span>{{ f.desc }}</span>
        </div>
      </div>
    </div>

    <footer class="plugin-foot">
      <a class="btn btn--ghost btn--sm" :href="plugin.repo" target="_blank" rel="noopener">
        {{ t('plugins.viewRepo') }}
        <IconGlyph name="external" :size="13" :stroke="2" class="btn-icon" />
      </a>
      <a class="btn btn--ghost btn--sm" :href="plugin.npm" target="_blank" rel="noopener">
        <IconGlyph name="npm" :size="14" :stroke="2" class="btn-icon" />
        npm
      </a>
    </footer>
  </article>
</template>

<style scoped>
.plugin-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: var(--sp-6);
  border-radius: var(--r-xl);
  background: linear-gradient(180deg, oklch(0.16 0.04 265 / 0.85), oklch(0.12 0.03 265 / 0.9));
  border: 1px solid var(--border);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  transition: transform var(--dur-med) var(--ease-out), border-color var(--dur-med) var(--ease-out), box-shadow var(--dur-med) var(--ease-out);
}

.plugin-card::before {
  content: '';
  position: absolute;
  inset: 0 0 auto;
  height: 220px;
  pointer-events: none;
}

.plugin-card--brand::before {
  background: radial-gradient(60% 100% at 85% 0%, rgb(91 127 229 / 0.16), transparent 70%);
}

.plugin-card--cyan::before {
  background: radial-gradient(60% 100% at 85% 0%, rgb(34 211 238 / 0.12), transparent 70%);
}

.plugin-card--violet::before {
  background: radial-gradient(60% 100% at 85% 0%, rgb(139 92 246 / 0.14), transparent 70%);
}

.plugin-card--emerald::before {
  background: radial-gradient(60% 100% at 85% 0%, rgb(52 211 153 / 0.12), transparent 70%);
}

.plugin-card--amber::before {
  background: radial-gradient(60% 100% at 85% 0%, rgb(251 191 36 / 0.12), transparent 70%);
}

.plugin-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-strong);
  box-shadow: var(--shadow-float);
}

.plugin-head {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--sp-4);
}

.plugin-icon {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: var(--r-md);
  flex: none;
}

.plugin-icon--brand {
  color: #c7d5ff;
  background: rgb(91 127 229 / 0.16);
  border: 1px solid rgb(91 127 229 / 0.3);
}

.plugin-icon--cyan {
  color: #b9f2ff;
  background: rgb(34 211 238 / 0.12);
  border: 1px solid rgb(34 211 238 / 0.28);
}

.plugin-icon--violet {
  color: #e2d4ff;
  background: rgb(139 92 246 / 0.14);
  border: 1px solid rgb(139 92 246 / 0.3);
}

.plugin-icon--emerald {
  color: #b9f6dd;
  background: rgb(52 211 153 / 0.13);
  border: 1px solid rgb(52 211 153 / 0.28);
}

.plugin-icon--amber {
  color: #ffe3b3;
  background: rgb(251 191 36 / 0.13);
  border: 1px solid rgb(251 191 36 / 0.28);
}

.plugin-id {
  min-width: 0;
}

.plugin-name {
  font-size: var(--fs-h3);
  font-weight: 700;
}

.plugin-name__mono {
  font-family: var(--font-mono);
  font-size: 1.1em;
  letter-spacing: -0.02em;
}

.plugin-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: var(--sp-3);
}

.plugin-links {
  display: flex;
  gap: 4px;
  margin-inline-start: auto;
}

.icon-link {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: var(--r-sm);
  color: var(--text-3);
  transition: color var(--dur-fast) var(--ease-out), background-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
}

.icon-link:hover {
  color: var(--text-1);
  background: oklch(0.3 0.05 265 / 0.5);
}

.icon-link:active {
  transform: scale(0.92);
}

.plugin-tagline {
  position: relative;
  margin-top: var(--sp-5);
  font-size: calc(var(--fs-body) + 2px);
  font-weight: 600;
  color: var(--text-1);
  line-height: 1.5;
}

.plugin-desc {
  position: relative;
  margin-top: var(--sp-3);
  color: var(--text-2);
  font-size: var(--fs-sm);
  line-height: 1.65;
}

.plugin-features {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-3);
  margin-top: var(--sp-5);
}

.plugin-feature {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: var(--sp-3);
  border-radius: var(--r-md);
  background: oklch(0.2 0.04 265 / 0.5);
  border: 1px solid var(--border);
}

.plugin-feature-icon {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: var(--r-xs);
  flex: none;
  margin-top: 1px;
}

.plugin-feature-icon--brand {
  color: #aebfff;
  background: rgb(91 127 229 / 0.16);
}

.plugin-feature-icon--cyan {
  color: #9fecfb;
  background: rgb(34 211 238 / 0.14);
}

.plugin-feature-icon--violet {
  color: #d6c5ff;
  background: rgb(139 92 246 / 0.16);
}

.plugin-feature-icon--emerald {
  color: #9ff0cd;
  background: rgb(52 211 153 / 0.15);
}

.plugin-feature-icon--amber {
  color: #ffd893;
  background: rgb(251 191 36 / 0.15);
}

.plugin-feature-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.plugin-feature-text strong {
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--text-1);
}

.plugin-feature-text span {
  font-size: var(--fs-xs);
  line-height: 1.5;
  color: var(--text-3);
}

.plugin-foot {
  position: relative;
  display: flex;
  gap: var(--sp-2);
  margin-top: var(--sp-6);
  padding-top: var(--sp-4);
  border-top: 1px solid var(--border);
}

@media (max-width: 520px) {
  .plugin-features {
    grid-template-columns: 1fr;
  }
}
</style>
