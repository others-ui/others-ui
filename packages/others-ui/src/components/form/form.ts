import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ContextProvider } from '@lit-labs/context'
import { FormContext } from '../../context/FormContext'
import styles from './styles.scss'
import { prefix } from '../../common'

export interface FormProps {
 
}

@customElement(`${prefix}-form`)
export class Form extends LitElement implements FormProps {

  /**
   * 向子元素提供状态的provider
  */
  provider = new ContextProvider(this, { context: FormContext })

  /**
   * 保存所有受控表单元素的状态
  */
  initValues: Record<string, unknown> = {}
  values: Record<string, unknown> = {}

  constructor() {
    super()

    this.provider.setValue({
      submit: this.onSubmit.bind(this),
      reset: this.onReset.bind(this),
      setName: this.setName.bind(this),
      setValue: this.setValue.bind(this),
      init: this.init.bind(this),
      initValues: this.initValues
    })
  }

  private onSubmit() {
    const detail = {...this.values}
    this.dispatchEvent(new CustomEvent('submit', { detail }))
  }

  private onReset() {
    this.values = {...this.initValues}
    // console.log()
    this.provider.updateObservers()
  }

  init(name: string, initValue: unknown) {
    this.initValues[name] = initValue
    this.values[name] = initValue
  }

  /**
   * 初始化表单元素
  */
  setName(name: string, oldName?: string) {
    let value: unknown = undefined

    if (oldName != null) {
      value = this.values[oldName]
      delete this.values[oldName]
    }

    this.values[name] = value
  }

  setValue(name: string, value: unknown) {
    this.values[name] = value
  }

  connectedCallback(): void {
    super.connectedCallback()
  }

  static styles = css`${unsafeCSS(styles)}`
  render() {  
    return html`
     <slot></slot>
    `
  }
}