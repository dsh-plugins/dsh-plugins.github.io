<script setup lang="ts">
import { useI18n } from '../i18n'
import Reveal from './ui/Reveal.vue'

const { t } = useI18n()

const stats = [
  { value: '3', key: 'plugins' },
  { value: '2', key: 'packages' },
  { value: '7', key: 'routes' },
  { value: '0', key: 'deps' },
] as const
</script>

<template>
  <section class="stats" aria-label="Organization stats">
    <Reveal>
      <div class="stats-grid container-wide">
        <div v-for="(s, i) in stats" :key="s.key" class="stat" :style="{ '--reveal-delay': `${i * 70}ms` }">
          <span class="stat-value">{{ s.value }}</span>
          <span class="stat-label">{{ t(`stats.${s.key}`) }}</span>
        </div>
      </div>
    </Reveal>
  </section>
</template>

<style scoped>
.stats {
  padding-block: var(--sp-7);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  background: oklch(0.09 0.025 265 / 0.5);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--sp-6);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;
}

.stat-value {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-size: clamp(2rem, 4vw, 2.6rem);
  font-weight: 700;
  background: var(--grad-text);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1;
}

.stat-label {
  font-size: var(--fs-sm);
  color: var(--text-3);
}

@media (max-width: 720px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--sp-6) var(--sp-4);
  }
}
</style>
