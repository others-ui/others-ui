import { PropertyValueMap, css, html, unsafeCSS } from 'lit'
import { property, state } from 'lit/decorators.js'
import { provide } from '@lit/context'
import {
  RadioGroupContext,
  RadioGroupContextType,
  RadioGroupContextValue
} from './RadioGroupContext'
import { BaseElement } from '../../common'
import styles from './styles/radio-group.scss'
import { watch } from '../../utils/watch'
import { FormItemContextValue } from '../../context/FormItemContext'


export interface radioGroupProps<T> {
  value?: T
}


export class radioGroup<T> extends BaseElement implements radioGroupProps<T> {
  static componentName = 'radio-group'
  static styles = css`${unsafeCSS(styles)}`

  @provide({context: RadioGroupContext as RadioGroupContextType<T>})
  @property({attribute: false})
  private radioGroupContext?: RadioGroupContextValue<T>

  @property()
  public value?: T

  @state()
  public _value?: T

  connectedCallback() {
    super.connectedCallback()
    this._value = this.value
    this.radioGroupContext = {
      value: this._value,
      setValue: (value) => {
        this.radioGroupContext = {
          ...this.radioGroupContext!,
          value
        }
      },
    }
  }

  private setValue(value: T) {
    this.radioGroupContext = {
      ...this.radioGroupContext,
      value: value
    } as RadioGroupContextValue<T>
  }
  protected willUpdate(state: PropertyValueMap<radioGroupProps<T> & { _value: T[], formItemContext: FormItemContextValue<T[]> }>) {
    watch(state, {
      value: () => {
        this._value = this.value
        this.setValue(this._value as any)
      }
    })
  }

  render() {
    return html`
      <slot></slot>
    `
  }
}
