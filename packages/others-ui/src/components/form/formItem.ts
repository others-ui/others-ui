import { PropertyValueMap, css, html, unsafeCSS } from 'lit'
import styles from './styles/form-item.scss'
import { BaseElement } from '../../common'
import { property } from 'lit/decorators.js'
import { consume, provide } from '@lit/context'
import { FormContext, FormContextValue } from '../../context/FormContext'
import { FormItemContext, FormItemContextValue } from '../../context/FormItemContext'

export interface FormItemProps {
  label?: string
  name?: string
}

export class FormItem<T = unknown> extends BaseElement implements FormItemProps {
  static componentName = 'form-item'
  static styles = css`${unsafeCSS(styles)}`

  /**
   * 向子元素提供状态的provider
  */
  @consume({context: FormContext, subscribe: true})
  @property({attribute: false})
  public formContext?: FormContextValue

  @provide({context: FormItemContext})
  @property({attribute: false})
  private formItemContext?: FormItemContextValue<T>

  @property({type: String})
  public label?: string

  @property({type: String})
  public name?: string

  constructor() {
    super()
  }

  connectedCallback() {
    super.connectedCallback()
    this.formItemContext = {
      value: this.value,
      setValue: (value: T) => {
        if (!this.name) {
          return
        }
        this.formContext?.setValue(this.name, value)
      },
    }
  }

  private get value(): T {
    if (!this.name) {
      return undefined as T
    }
    return this.formContext?.values[this.name] as T
  }

  protected willUpdate(state: PropertyValueMap<FormItemProps & { formContext: FormContextValue }> ): void {
    if (state.has('formContext') && this.formItemContext) {
      this.formItemContext = {...this.formItemContext, value: this.value}
    }
  }

  render() {
    return html`
      <div class="container">
        <div class="label">${this.label}</div>
        <div class="wrapper">
          <slot></slot>
        </div>
      </div>
    `
  }
}
