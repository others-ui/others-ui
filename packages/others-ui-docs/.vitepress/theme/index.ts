// https://vitepress.dev/guide/custom-theme
import { h, version } from 'vue'
import Theme from 'vitepress/theme'
import OthersUI, { register } from 'others-ui'
import 'others-ui/others-ui.css'
import './style.css'

console.log('vue version', version)

import {
  AntDesignContainer,
  ElementPlusContainer,
  NaiveUIContainer
} from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

console.log('others-ui', OthersUI)
register()

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('demo-preview', AntDesignContainer)
  },
}
