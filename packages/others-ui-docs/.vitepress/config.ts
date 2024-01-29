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
      { text: '引导', link: '/docs/before-start' },
      { text: '文档', link: '/docs/guide' },
      {
        text: version,
        items: [
          { text: '更新日志', link: 'https://github.com/others-ui/others-ui/blob/dev/packages/others-ui/CHANGELOG.md' },
          { text: 'npm', link: 'https://www.npmjs.com/package/others-ui' },
        ]
      },
      { text: '关于我们', link: '/about' },
    ],

    sidebar: [
      {
        text: '开始指南',
        items: [
          { text: '简介', link: '/docs/before-start' },
          { text: '快速开始', link: '/docs/guide' }
        ]
      },
      {
        text: '组件',
        items: [
          { text: 'Button', link: '/docs/button' },
          { text: 'Switch', link: '/docs/switch' },
          { text: 'Input', link: '/docs/input' },
          { text: 'Checkbox', link: '/docs/checkbox' },
          { text: 'Form', link: '/docs/form' },
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
  base: '/others-ui/'
})
