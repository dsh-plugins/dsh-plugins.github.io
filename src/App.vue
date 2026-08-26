<script setup lang="ts">
import { useI18n } from './i18n'
import SiteNav from './components/SiteNav.vue'
import SiteFooter from './components/SiteFooter.vue'

const { toggle } = useI18n()
</script>

<template>
  <SiteNav @toggle-lang="toggle" />
  <RouterView />
  <SiteFooter />
</template>
