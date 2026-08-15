/* ============================================================
   Plugin metadata — sourced from the GitHub org (2026-08-15)
   ============================================================ */

export interface PluginMeta {
  id: 'auxiliary' | 'buddy'
  name: string
  version: string
  language: string
  license: string
  repo: string
  npm: string
  installCmd: string
  /** i18n prefix into the dict, e.g. 'plugins.auxiliary' */
  i18n: 'plugins.auxiliary' | 'plugins.buddy'
  theme: 'brand' | 'cyan'
}

export const plugins: PluginMeta[] = [
  {
    id: 'auxiliary',
    name: 'dsh-auxiliary',
    version: '0.4.1',
    language: 'TypeScript',
    license: 'LGPL-3.0',
    repo: 'https://github.com/dsh-plugins/dsh-auxiliary',
    npm: 'https://www.npmjs.com/package/@dsh-plugin/dsh-auxiliary',
    installCmd: 'dsh plugin add @dsh-plugin/dsh-auxiliary',
    i18n: 'plugins.auxiliary',
    theme: 'brand',
  },
  {
    id: 'buddy',
    name: 'dsh-thought-buddy',
    version: '0.1.0',
    language: 'JavaScript',
    license: 'BSD-3-Clause',
    repo: 'https://github.com/dsh-plugins/dsh-thought-buddy',
    npm: 'https://www.npmjs.com/package/@dsh-plugin/dsh-thought-buddy',
    installCmd: 'dsh plugin add @dsh-plugin/dsh-thought-buddy',
    i18n: 'plugins.buddy',
    theme: 'cyan',
  },
]
