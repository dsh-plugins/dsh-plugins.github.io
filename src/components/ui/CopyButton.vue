<script setup lang="ts">
/** Copy-to-clipboard button with visual feedback. */
import { onBeforeUnmount, ref } from 'vue'
import { useI18n } from '../../i18n'
import IconGlyph from './IconGlyph.vue'

const props = defineProps<{
  text: string
  label?: string
}>()

const { t } = useI18n()
const copied = ref(false)
let timer: number | undefined

async function copy() {
  const value = props.text
  try {
    await navigator.clipboard.writeText(value)
  } catch {
    // Fallback for older browsers / non-secure contexts
    const ta = document.createElement('textarea')
    ta.value = value
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  }
  copied.value = true
  window.clearTimeout(timer)
  timer = window.setTimeout(() => (copied.value = false), 2000)
}

onBeforeUnmount(() => window.clearTimeout(timer))
</script>

<template>
  <button class="copy-btn" type="button" :aria-label="label ?? t('install.copy')" @click="copy">
    <IconGlyph :name="copied ? 'check' : 'copy'" :size="14" :stroke="2" />
    <span>{{ copied ? t('install.copied') : (label ?? t('install.copy')) }}</span>
  </button>
</template>

<style scoped>
.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding-inline: 12px;
  border-radius: var(--r-sm);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--text-2);
  background: oklch(0.3 0.05 265 / 0.5);
  border: 1px solid var(--border);
  transition:
    color var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) var(--ease-out),
    transform var(--dur-fast) var(--ease-out),
    background-color var(--dur-fast) var(--ease-out);
}

.copy-btn:hover {
  color: var(--text-1);
  border-color: var(--border-strong);
  background: oklch(0.36 0.06 265 / 0.6);
}

.copy-btn:active {
  transform: scale(0.96);
}
</style>
