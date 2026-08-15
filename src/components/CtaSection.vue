<script setup lang="ts">
import { useI18n } from '../i18n'
import IconGlyph from './ui/IconGlyph.vue'
import DivingBuddy from './ui/DivingBuddy.vue'
import Reveal from './ui/Reveal.vue'

const { t } = useI18n()
</script>

<template>
  <section class="section cta">
    <div class="container">
      <Reveal>
        <div class="cta-panel">
          <div class="cta-glow" aria-hidden="true"></div>
          <div class="cta-buddy" aria-hidden="true">
            <DivingBuddy :size="64" />
          </div>
          <h2 class="cta-title">{{ t('cta.title') }}</h2>
          <p class="cta-sub">{{ t('cta.sub') }}</p>
          <div class="cta-actions">
            <a class="btn btn--primary" href="https://github.com/dsh-plugins" target="_blank" rel="noopener">
              <IconGlyph name="github" :size="15" :stroke="2" class="btn-icon" />
              {{ t('cta.btnGithub') }}
            </a>
            <a
              class="btn btn--ghost"
              href="https://github.com/dsh-plugins/dsh-plugins.github.io/issues/new"
              target="_blank"
              rel="noopener"
            >
              {{ t('cta.btnIssue') }}
              <IconGlyph name="arrow" :size="15" :stroke="2" class="btn-icon" />
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
</template>

<style scoped>
.cta {
  padding-top: 0;
}

.cta-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--sp-9) var(--sp-6);
  border-radius: var(--r-xl);
  background: linear-gradient(140deg, oklch(0.17 0.05 265 / 0.95), oklch(0.13 0.045 290 / 0.95));
  border: 1px solid var(--border);
  overflow: hidden;
}

.cta-glow {
  position: absolute;
  inset: -40% -20% auto;
  height: 80%;
  background: radial-gradient(50% 100% at 50% 100%, rgb(91 127 229 / 0.28), transparent 70%);
  pointer-events: none;
}

.cta-buddy {
  position: relative;
  margin-bottom: var(--sp-5);
  padding: 12px;
  border-radius: var(--r-full);
  background: oklch(0.2 0.05 265 / 0.7);
  border: 1px solid var(--border-strong);
  box-shadow: var(--glow-violet);
}

.cta-title {
  position: relative;
  font-size: var(--fs-h1);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-1);
}

.cta-sub {
  position: relative;
  max-width: 52ch;
  margin-top: var(--sp-4);
  color: var(--text-2);
}

.cta-actions {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--sp-3);
  margin-top: var(--sp-7);
}
</style>
