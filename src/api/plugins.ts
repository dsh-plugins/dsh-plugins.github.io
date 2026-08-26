/**
 * Plugin descriptor from the dsh-plugin-market API
 * (https://dsh-plugins.github.io/api/plugins.json).
 */

export interface PluginDescription {
  language: string
  content: string
}

export interface PluginRelationship {
  type: 'dependency' | 'incompatibility'
  id: string
  versions: string
}

export interface PluginUrls {
  homepage?: string
  repository?: string
  issues?: string
}

export interface MarketPlugin {
  id: string
  name: string
  description?: string | PluginDescription[]
  support_versions?: string | string[]
  urls?: PluginUrls
  relationship?: PluginRelationship[]
}

export interface MarketPluginResult {
  /** The plugin's own repo/homepage URL if available, else repository url. */
  link: string
  plugin: MarketPlugin
}

const API_URL = '/api/plugins.json'

/** Localized description content for the current language. */
export function pickDescription(plugin: MarketPlugin): string {
  const desc = plugin.description
  if (!desc) return ''
  if (typeof desc === 'string') return desc
  const lang = document.documentElement.lang === 'zh-CN' ? 'zh-CN' : 'en-US'
  const match = desc.find((d) => d.language === lang)
  return (match ?? desc[0])?.content ?? ''
}

export async function fetchPlugins(): Promise<MarketPluginResult[]> {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error(`Failed to fetch ${API_URL}: ${res.status}`)
  const list: MarketPlugin[] = await res.json()
  return list.map((plugin) => {
    const urls = plugin.urls
    const link = urls?.homepage ?? urls?.repository ?? ''
    return { link, plugin }
  })
}
