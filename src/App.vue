<script setup lang="ts">
import { useI18n } from './i18n'
import SiteNav from './components/SiteNav.vue'
import HeroSection from './components/HeroSection.vue'
import StatsBar from './components/StatsBar.vue'
import PluginsSection from './components/PluginsSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import InstallSection from './components/InstallSection.vue'
import EcoSection from './components/EcoSection.vue'
import AboutSection from './components/AboutSection.vue'
import CtaSection from './components/CtaSection.vue'
import SiteFooter from './components/SiteFooter.vue'

const { toggle } = useI18n()
</script>

<template>
  <SiteNav @toggle-lang="toggle" />
  <main>
    <HeroSection />
    <StatsBar />
    <PluginsSection />
    <FeaturesSection />
    <InstallSection />
    <EcoSection />
    <AboutSection />
    <CtaSection />
  </main>
  <SiteFooter />
</template>
