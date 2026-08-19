/* ============================================================
   Plugin metadata — sourced from the GitHub org (2026-08-19)
   ============================================================ */

export type PluginId =
  | 'auxiliary'
  | 'buddy'
  | 'approve'
  | 'review'
  | 'sidebar'
  | 'loader'
  | 'stable'

export interface PluginMeta {
  id: PluginId
  name: string
  version: string
  language: string
  license: string
  repo: string
  npm: string
  installCmd: string
  /** i18n prefix into the dict, e.g. 'plugins.auxiliary' */
  i18n: string
  theme: 'brand' | 'cyan' | 'violet' | 'emerald' | 'amber'
}

export const plugins: PluginMeta[] = [
  {
    id: 'auxiliary',
    name: 'dsh-auxiliary',
    version: '0.4.3',
    language: 'TypeScript',
    license: 'LGPL-3.0',
    repo: 'https://github.com/dsh-plugins/dsh-auxiliary',
    npm: 'https://www.npmjs.com/package/@dsh-plugin/dsh-auxiliary',
    installCmd: 'dsh plugin add @dsh-plugin/dsh-auxiliary',
    i18n: 'plugins.auxiliary',
    theme: 'brand',
  },
  {
    id: 'loader',
    name: 'dsh-loader',
    version: '1.1.0',
    language: 'TypeScript',
    license: 'LGPL-3.0',
    repo: 'https://github.com/dsh-plugins/dsh-loader',
    npm: 'https://www.npmjs.com/package/@dsh-plugin/dsh-loader',
    installCmd: 'dsh plugin add @dsh-plugin/dsh-loader',
    i18n: 'plugins.loader',
    theme: 'brand',
  },
  {
    id: 'approve',
    name: 'dsh-approve-for-me',
    version: '0.3.0',
    language: 'JavaScript',
    license: 'MIT',
    repo: 'https://github.com/dsh-plugins/dsh-approve-for-me',
    npm: 'https://www.npmjs.com/package/@dsh-plugin/dsh-approve-for-me',
    installCmd: 'dsh plugin add @dsh-plugin/dsh-approve-for-me',
    i18n: 'plugins.approve',
    theme: 'amber',
  },
  {
    id: 'review',
    name: 'dsh-code-review',
    version: '0.2.0',
    language: 'JavaScript',
    license: 'GPL-3.0',
    repo: 'https://github.com/dsh-plugins/dsh-code-review',
    npm: 'https://www.npmjs.com/package/@dsh-plugin/dsh-code-review',
    installCmd: 'dsh plugin add @dsh-plugin/dsh-code-review',
    i18n: 'plugins.review',
    theme: 'emerald',
  },
  {
    id: 'sidebar',
    name: 'dsh-better-sidebar-loader',
    version: '0.14.0',
    language: 'TypeScript',
    license: 'MIT',
    repo: 'https://github.com/dsh-plugins/dsh-better-sidebar-loader',
    npm: 'https://www.npmjs.com/package/@dsh-plugin/dsh-better-sidebar-loader',
    installCmd: 'dsh plugin add @dsh-plugin/dsh-better-sidebar-loader',
    i18n: 'plugins.sidebar',
    theme: 'violet',
  },
  {
    id: 'buddy',
    name: 'dsh-thought-buddy',
    version: '0.2.0',
    language: 'TypeScript',
    license: 'BSD-3-Clause',
    repo: 'https://github.com/dsh-plugins/dsh-thought-buddy',
    npm: 'https://www.npmjs.com/package/@dsh-plugin/dsh-thought-buddy',
    installCmd: 'dsh plugin add @dsh-plugin/dsh-thought-buddy',
    i18n: 'plugins.buddy',
    theme: 'cyan',
  },
  {
    id: 'stable',
    name: 'dsh-stable-web-prompt',
    version: '0.1.0',
    language: 'JavaScript',
    license: 'MIT',
    repo: 'https://github.com/dsh-plugins/dsh-stable-web-prompt',
    npm: 'https://www.npmjs.com/package/dsh-stable-web-prompt',
    installCmd: 'dsh plugin add dsh-stable-web-prompt',
    i18n: 'plugins.stable',
    theme: 'cyan',
  },
]
