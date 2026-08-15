import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Served from the custom domain root (dsh-plug.in) and from
  // dsh-plugins.github.io on the default branch via GitHub Pages.
  base: '/',
  server: {
    watch: {
      // Ignore atomic-write temp files (the file sandbox writes
      // alongside edited files) so the watcher does not hit EBUSY.
      ignored: ['**/*.tmpdir/**', '**/*.tmp', '**/.shots/**', '**/.pnpm-cache/**'],
    },
  },
  build: {
    target: 'es2020',
    cssTarget: 'chrome100',
    sourcemap: false,
    assetsInlineLimit: 4096,
  },
})
