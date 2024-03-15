import type { BaseElement } from '@others-ui/common'
import * as components from './components'

// @ts-ignore
const c = components as Record<string, typeof BaseElement>

// 组件注册函数
export function register() {
  for (const name in c) {
    c[name].register?.()
  }
}
