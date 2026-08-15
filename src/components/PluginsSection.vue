<script setup lang="ts">
import { useI18n } from '../i18n'
import { plugins } from '../data/plugins'
import PluginCard from './PluginCard.vue'
import Reveal from './ui/Reveal.vue'

const { t } = useI18n()
</script>

<template>
  <section id="plugins" class="section plugins">
    <div class="container">
      <Reveal>
        <div class="section-head">
          <p class="eyebrow">{{ t('plugins.eyebrow') }}</p>
          <h2 class="section-title">{{ t('plugins.title') }}</h2>
          <p class="section-lead">{{ t('plugins.lead') }}</p>
        </div>
      </Reveal>

      <div class="plugins-grid">
        <Reveal v-for="(p, i) in plugins" :key="p.id" :delay="i * 120">
          <PluginCard :plugin="p" />
        </Reveal>
      </div>
    </div>
  </section>
</template>

<style scoped>
.plugins-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--sp-6);
  align-items: start;
}

@media (max-width: 900px) {
  .plugins-grid {
    grid-template-columns: 1fr;
  }
}
</style>
