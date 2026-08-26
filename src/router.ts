import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import PluginsMarketView from './views/PluginsMarketView.vue'

// Hash history: GitHub Pages serves only static files with no server-side
// rewrite, so /plugins would 404 on refresh. The #/plugins route is safe.
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/plugins', name: 'plugins', component: PluginsMarketView },
    // Legacy anchors (#features, #install, ...) and any unknown hash route
    // fall back to the home page instead of a blank view.
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})
