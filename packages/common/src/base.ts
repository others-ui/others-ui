import { LitElement, html } from './lit'
import { parseExpression } from './utils'
import { EventAgent } from './types'

export const EXPRESSION_PREFIX = '$'
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
    this.registerEventAgent()
    this.registerExpressionProperties()

    if (!customElements.get(this.defineName)) {
      customElements.define(this.defineName, this)
    }
  }

  protected emit<T = any>(event: string, detail: T) {
    this.dispatchEvent(
      new CustomEvent(event, { detail })
    )
  }


  // 代理事件封装
  static eventAgent: EventAgent<any> = {}
  private eventAgent: EventAgent<any> = {}
  // 以on事件开头的map
  private onEventMap = new Map<string, (e: Event) => void>
  // 原始回调和封装回调的映射
  private _eventMap: Map<(e: Event) => void, (e: Event) => void> = new Map()

  static registerEventAgent() {
    const connectedCallback = this.prototype.connectedCallback
    const that = this
    this.prototype.connectedCallback = function() {
      this.eventAgent = that.eventAgent
      this.startProxyOnEventListener()
      connectedCallback.call(this)
    }
  }


  // 拦截自定义事件
  addEventListener(
    type: keyof HTMLElementEventMap,
    listener: (e: Event) => void,
    options?: boolean | AddEventListenerOptions
  ) {
    // 为lit做兼容
    if (!this._eventMap || !this.eventAgent) {
      super.addEventListener(type, listener, options)
      return listener
    }

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
    this._eventMap.set(listener, fn)
    super.addEventListener(type, fn, options)
    return fn
  }

  removeEventListener(
    type: keyof HTMLElementEventMap,
    listener: (e: Event) => void,
    options?: boolean | EventListenerOptions
  ) {
    const realListener = this._eventMap.has(listener)
      ? this._eventMap.get(listener)
      : listener
    super.removeEventListener(type, realListener!, options)
    super.removeEventListener(type, listener, options)
  }

  // 必须要在子类启用
  private startProxyOnEventListener() {
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


  // 注册支持表达式的属性
  static expressionProperties: string[] = []
  static registerExpressionProperties() {
    this.expressionProperties.forEach(prop => this.registerExpressionProperty(prop))
    const connectedCallback = this.prototype.connectedCallback
    const that = this
    this.prototype.connectedCallback = function() {
      that.expressionProperties.forEach(prop => {
        const self = this as Record<string, any>
        const ex = self[EXPRESSION_PREFIX + prop]
        if (typeof ex === 'string' && ex) {
          self[prop] = parseExpression(ex, { html })
        }
      })
      connectedCallback.call(this)
    }
  }
  static registerExpressionProperty(prop: string) {
    const exProp = EXPRESSION_PREFIX + prop
    this.properties = {
      ...this.properties,
      [exProp]: {
        type: String
      }
    }
  }
}
