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
}
