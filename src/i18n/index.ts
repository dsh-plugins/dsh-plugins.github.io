import { computed, ref, watchEffect } from 'vue'
import { zh } from './zh'
import { en } from './en'

export type Lang = 'zh' | 'en'
export type Dict = typeof zh

export const messages: Record<Lang, Dict> = { zh, en }

const STORAGE_KEY = 'dsh-plugins.lang'

function detect(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'zh' || saved === 'en') return saved
  } catch {
    /* SSR / privacy mode — fall through */
  }
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

const lang = ref<Lang>(detect())

/** Deep get with dot path, e.g. t('plugins.title') */
function lookup(dict: Dict, path: string): string {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key]
    return undefined
  }, dict) as string
}

export function useI18n() {
  const d = computed(() => messages[lang.value])

  const t = (path: string): string => lookup(d.value, path)

  watchEffect(() => {
    document.documentElement.lang = lang.value === 'zh' ? 'zh-CN' : 'en'
  })

  const toggle = () => {
    lang.value = lang.value === 'zh' ? 'en' : 'zh'
    try {
      localStorage.setItem(STORAGE_KEY, lang.value)
    } catch {
      /* ignore */
    }
  }

  return { lang: computed(() => lang.value), d, t, toggle }
}
