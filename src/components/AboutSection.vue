<script setup lang="ts">
import { useI18n } from '../i18n'
import IconGlyph from './ui/IconGlyph.vue'
import Reveal from './ui/Reveal.vue'

const { t, d } = useI18n()

const pointIcons = ['plug', 'core', 'docs', 'license'] as const
</script>

<template>
  <section id="about" class="section about">
    <div class="container">
      <div class="about-grid">
        <Reveal>
          <div class="section-head">
            <p class="eyebrow">{{ t('about.eyebrow') }}</p>
            <h2 class="section-title">{{ t('about.title') }}</h2>
            <p class="section-lead">{{ t('about.lead') }}</p>

            <div class="maintainer">
              <span class="maintainer-label">{{ t('about.maintainer') }}</span>
              <a class="maintainer-person" href="https://github.com/Gu-ZT" target="_blank" rel="noopener">
                <span class="maintainer-avatar" aria-hidden="true">
                  <IconGlyph name="heart" :size="14" :stroke="1.8" />
                </span>
                Gu-ZT
                <IconGlyph name="external" :size="12" :stroke="2" />
              </a>
            </div>

            <div class="org-facts">
              <div class="fact-row"><span>created</span><strong>2026-08-15</strong></div>
              <div class="fact-row"><span>public repos</span><strong>2 · 1 private</strong></div>
              <div class="fact-row"><span>members</span><strong>1</strong></div>
              <div class="fact-row"><span>npm scope</span><strong>@dsh-plugin</strong></div>
              <div class="fact-row"><span>licenses</span><strong>LGPL-3.0 · BSD-3-Clause</strong></div>
            </div>
          </div>
        </Reveal>

        <div class="about-points">
          <Reveal v-for="(p, i) in d.about.points" :key="p.title" :delay="i * 90">
            <div class="about-point">
              <span class="about-point-icon">
                <IconGlyph :name="pointIcons[i]" :size="17" :stroke="1.8" />
              </span>
              <div>
                <h3 class="about-point-title">{{ p.title }}</h3>
                <p class="about-point-desc">{{ p.desc }}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  border-top: 1px solid var(--border);
}

.about-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: var(--sp-8);
  align-items: start;
}

.maintainer {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  margin-top: var(--sp-6);
}

.maintainer-label {
  font-size: var(--fs-xs);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-3);
  font-family: var(--font-mono);
}

.maintainer-person {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px 6px 6px;
  border-radius: var(--r-full);
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--text-1);
  background: oklch(0.16 0.04 265 / 0.8);
  border: 1px solid var(--border);
  transition: border-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
}

.maintainer-person:hover {
  border-color: var(--border-strong);
  transform: translateY(-1px);
}

.maintainer-person :deep(svg:last-child) {
  color: var(--text-3);
}

.maintainer-avatar {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  color: #fecdd3;
  background: linear-gradient(135deg, rgb(91 127 229 / 0.5), rgb(139 92 246 / 0.5));
}

/* org fact sheet */
.org-facts {
  margin-top: var(--sp-6);
  padding: var(--sp-4) var(--sp-5);
  border-radius: var(--r-lg);
  background: oklch(0.14 0.035 265 / 0.75);
  border: 1px solid var(--border);
  font-family: var(--font-mono);
}

.fact-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-4);
  padding-block: var(--sp-3);
  border-bottom: 1px solid var(--border);
  font-size: var(--fs-xs);
}

.fact-row:last-child {
  border-bottom: none;
  padding-bottom: var(--sp-2);
}

.fact-row span {
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.7rem;
}

.fact-row strong {
  color: var(--text-1);
  font-weight: 600;
  text-align: end;
}

.about-points {
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
}

.about-point {
  display: flex;
  gap: var(--sp-4);
  padding: var(--sp-5);
  border-radius: var(--r-lg);
  background: oklch(0.14 0.035 265 / 0.75);
  border: 1px solid var(--border);
  transition: transform var(--dur-med) var(--ease-out), border-color var(--dur-med) var(--ease-out);
}

.about-point:hover {
  transform: translateY(-2px);
  border-color: var(--border-strong);
}

.about-point-icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: var(--r-sm);
  color: #c7d5ff;
  background: rgb(91 127 229 / 0.15);
  border: 1px solid rgb(91 127 229 / 0.26);
}

.about-point-title {
  font-size: var(--fs-body);
  font-weight: 600;
  color: var(--text-1);
}

.about-point-desc {
  margin-top: 4px;
  font-size: var(--fs-sm);
  line-height: 1.6;
  color: var(--text-2);
}

@media (max-width: 860px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: var(--sp-6);
  }
}
</style>
