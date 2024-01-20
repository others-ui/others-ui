import { LitElement } from 'lit'

export const prefix = process.env.OTHER_PREFIX

export class BaseElement extends LitElement {
  static componentName: string = ''

  static get defineName() {
    return `${prefix}-${this.componentName}`
  }

  static register() {
    if (!this.componentName) {
      return
    }
    customElements.define(this.defineName, this)
  }

  protected emit<T = any>(event: string, detail: T) {
    this.dispatchEvent(
      new CustomEvent(event, { detail })
    )
  }



  // 代理事件封装
  protected eventAgent: Record<keyof HTMLElementEventMap, ((this: this, e: Event) => boolean) | boolean>
  private onEventMap = new Map<string, (e: Event) => void>
  private eventMap = new Map<(e: Event) => void, (e: Event) => void>

  constructor() {
    super()
    super.remove
    this.eventAgent = {} as Record<keyof HTMLElementEventMap, ((this: this, e: Event) => boolean) | boolean>
  }


  // 拦截自定义事件
  addEventListener(
    type: keyof HTMLElementEventMap,
    listener: (e: Event) => void,
    options?: boolean | AddEventListenerOptions
  ) {
    const fn = (e: Event) => {
      // 没有设置规则
      if (this.eventAgent[type] === undefined) {
        return listener.call(this, e)
      }

      const agent = this.eventAgent[type]

      if (typeof agent === 'boolean') {
        if (agent) {
          return listener.call(this, e)
        } else {
          return
        }
      }

      if (typeof agent === 'function') {
        if (agent.call(this, e)) {
          return listener.call(this, e)
        } else {
          return
        }
      }

      warn('Please pass in the correct parameters')
      return listener.call(this, e)
    }
    this.eventMap.set(listener, fn)
    super.addEventListener(type, fn, options)
    return fn
  }

  removeEventListener(
    type: keyof HTMLElementEventMap,
    listener: (e: Event) => void,
    options?: boolean | EventListenerOptions
  ) {
    const realListener = this.eventMap.has(listener)
      ? this.eventMap.get(listener)
      : listener
    super.removeEventListener(type, realListener!, options)
    super.removeEventListener(type, listener, options)
  }

  // 必须要在子类的构造函数启用
  startProxyOnEventListener() {
    for(const type in this.eventAgent) {
      this.addOnEventListener(type as keyof HTMLElementEventMap)
    }
  }

  // 代理原生on开头事件
  private addOnEventListener(type: keyof HTMLElementEventMap) {
    const name =  `on${type}`
    Object.defineProperty(this, name, {
      set: (fn: (e: Event) => void) => {
        if (typeof fn === 'function') {
          this.onEventMap.set(name, this.addEventListener(type, fn))
        } else {
          if (this.onEventMap.has(name)) {
            this.removeEventListener(type, this.onEventMap.get(name)!)
          }
        }
      },
      get: () => this.onEventMap.get(name)
    })
  }
}
