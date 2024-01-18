import type { BaseElement } from './common'
import * as components from './components'

const c = components as Record<string, typeof BaseElement>

// 组件注册函数
export function register() {
  for (const name in c) {
    c[name].register?.()
  }
}
