<script setup lang="ts">
import { useI18n } from '../i18n'
import IconGlyph from './ui/IconGlyph.vue'
import Reveal from './ui/Reveal.vue'

const { t, d } = useI18n()

const cardIcons = ['book', 'sparkle', 'box'] as const
</script>

<template>
  <section id="ecosystem" class="section eco">
    <div class="container">
      <Reveal>
        <div class="section-head section-head--center">
          <p class="eyebrow">{{ t('ecosystem.eyebrow') }}</p>
          <h2 class="section-title">{{ t('ecosystem.title') }}</h2>
          <p class="section-lead">{{ t('ecosystem.lead') }}</p>
        </div>
      </Reveal>

      <div class="eco-grid">
        <Reveal v-for="(c, i) in d.ecosystem.cards" :key="c.title" :delay="i * 110">
          <a class="eco-card" :href="c.href" target="_blank" rel="noopener">
            <span class="eco-icon">
              <IconGlyph :name="cardIcons[i]" :size="18" :stroke="1.8" />
            </span>
            <h3 class="eco-title">{{ c.title }}</h3>
            <p class="eco-desc">{{ c.desc }}</p>
            <span class="eco-link">
              {{ c.link }}
              <IconGlyph name="arrow" :size="13" :stroke="2" />
            </span>
          </a>
        </Reveal>
      </div>
    </div>
  </section>
</template>

<style scoped>
.eco {
  border-top: 1px solid var(--border);
}

.eco-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--sp-5);
}

.eco-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: var(--sp-6);
  border-radius: var(--r-lg);
  background: oklch(0.14 0.035 265 / 0.75);
  border: 1px solid var(--border);
  transition: transform var(--dur-med) var(--ease-out), border-color var(--dur-med) var(--ease-out), box-shadow var(--dur-med) var(--ease-out);
}

.eco-card:hover {
  transform: translateY(-3px);
  border-color: var(--border-strong);
  box-shadow: var(--glow-brand);
}

.eco-icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: var(--r-md);
  color: #c7d5ff;
  background: rgb(91 127 229 / 0.14);
  border: 1px solid rgb(91 127 229 / 0.26);
  margin-bottom: var(--sp-4);
}

.eco-title {
  font-size: var(--fs-h3);
  font-weight: 600;
  color: var(--text-1);
}

.eco-desc {
  margin-top: var(--sp-3);
  font-size: var(--fs-sm);
  line-height: 1.65;
  color: var(--text-2);
  flex: 1;
}

.eco-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: var(--sp-5);
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--brand-3);
  transition: gap var(--dur-fast) var(--ease-out);
}

.eco-card:hover .eco-link {
  gap: 10px;
}

@media (max-width: 860px) {
  .eco-grid {
    grid-template-columns: 1fr;
  }
}
</style>
