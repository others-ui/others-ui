import './presets'

if (__DEV__) {
  log(
    '%c %s',
    ` border-radius: 3px;
      padding: 3px 5px;
      color: white;
      background-color: green;
    `,
    '当前环境: development',
  )
}

// 注册函数
export * from './register'

// 组件
export * from './components'

export { html } from '@others-ui/common'
