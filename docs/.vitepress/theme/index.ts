import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import '../custom.css'
import '../styles/home.css'
import BlogMeta from '../components/BlogMeta.vue'
import LobsterAnimation from '../components/LobsterAnimation.vue'
import FreshDecorations from '../components/FreshDecorations.vue'
import NavigationCards from '../components/NavigationCards.vue'
import FeatureCards from '../components/FeatureCards.vue'
import WaveDivider from '../components/WaveDivider.vue'

/**
 * Expand the first collapsed sidebar section after route changes.
 */
function expandFirstSidebarItem() {
  if (typeof document === 'undefined') return

  const sidebar = document.querySelector('.VPSidebar')
  if (!sidebar) return

  const firstCollapsedItem = sidebar.querySelector('.VPSidebarItem.level-0.collapsed')
  if (firstCollapsedItem) {
    const toggleButton = firstCollapsedItem.querySelector('.caret')
    if (toggleButton && toggleButton instanceof HTMLElement) {
      toggleButton.click()
    }
  }
}

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-footer': () => h(BlogMeta)
    })
  },
  enhanceApp({ app, router }: EnhanceAppContext) {
    app.component('BlogMeta', BlogMeta)
    app.component('LobsterAnimation', LobsterAnimation)
    app.component('FreshDecorations', FreshDecorations)
    app.component('NavigationCards', NavigationCards)
    app.component('FeatureCards', FeatureCards)
    app.component('WaveDivider', WaveDivider)

    if (router) {
      router.onAfterRouteChanged = () => {
        if (typeof document !== 'undefined') {
          setTimeout(expandFirstSidebarItem, 100)
        }
      }
    }

    if (typeof document !== 'undefined') {
      setTimeout(expandFirstSidebarItem, 300)
    }
  }
}
