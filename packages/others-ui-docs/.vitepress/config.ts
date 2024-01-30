import { defineConfig } from 'vitepress'
import { version } from '../../others-ui/package.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "OthersUI",
  description: "others-ui",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '引导', link: '/before-start' },
      { text: '文档', link: '/guide' },
      {
        text: version,
        items: [
          { text: '更新日志', link: 'https://github.com/others-ui/others-ui/blob/main/packages/others-ui/CHANGELOG.md' },
          { text: 'npm', link: 'https://www.npmjs.com/package/others-ui' },
        ]
      },
      { text: '关于我们', link: '/about' },
    ],

    sidebar: [
      {
        text: '开始指南',
        items: [
          { text: '简介', link: '/before-start' },
          { text: '快速开始', link: '/guide' }
        ]
      },
      {
        text: '组件',
        items: [
          { text: 'Button', link: '/components/button' },
          { text: 'Switch', link: '/components/switch' },
          { text: 'Input', link: '/components/input' },
          { text: 'Checkbox', link: '/components/checkbox' },
          { text: 'Form', link: '/components/form' },
          { text: 'Select', link: '/components/select' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/others-ui/others-ui' }
    ],
    search: {
      provider: 'local'
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('ot-'),
      },
    },
  },
  base: '/docs/'
})
