// https://vitepress.dev/guide/custom-theme
import { App, h, version } from 'vue'
import Theme from 'vitepress/theme'
import OthersUI, { register } from 'others-ui'
import DContainer from '../DContainer.vue'
import 'others-ui/others-ui.css'
import './style.css'

console.log('vue version', version)
console.log('others-ui', OthersUI)
register()

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app }: { app: App }) {
    app.component('d-container', DContainer)
    app.mixin({
      mounted() {
          import('playground-elements')
      },
    })
  },
}
