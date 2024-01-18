import { PropertyValueMap } from 'lit'

type WatchHandler<T extends Record<string, any>> = {
  [K in keyof T]?: (oldValue: T[K]) => void
}
// 封装监听函数，在update周期使用
export function watch<T extends Record<string, any>>(
  state: PropertyValueMap<T>,
  handler: WatchHandler<T>
) {
  for (const prop in handler) {
    const fn = handler[prop]
    if (state.has(prop) && fn) {
      fn(state.get(prop)!)
    }
  }
}
