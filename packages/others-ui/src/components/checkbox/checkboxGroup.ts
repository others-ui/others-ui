import { PropertyValueMap, css, html, unsafeCSS } from 'lit'
import { property, state } from 'lit/decorators.js'
import { provide } from '@lit/context'
import {
  CheckboxGroupContext,
  CheckboxGroupContextType,
  CheckboxGroupContextValue
} from './GroupContext'
import { BaseElement } from '../../common'
import styles from './styles/checkbox-group.scss'
import { watch } from '../../utils/watch'


export interface CheckboxGroupProps<T> {
  value?: T[]
}


export class CheckboxGroup<T> extends BaseElement implements CheckboxGroupProps<T> {
  static componentName = 'checkbox-group'
  static styles = css`${unsafeCSS(styles)}`

  @provide({context: CheckboxGroupContext as CheckboxGroupContextType<T>})
  @property({attribute: false})
  private checkboxGroupContext?: CheckboxGroupContextValue<T>

  @property({type: Array})
  public value?: T[]

  @state()
  public _value?: T[]

  connectedCallback() {
    super.connectedCallback()
    this._value = this.value
    this.checkboxGroupContext = {
      value: this._value,
      setValue: (value: T[]) => {
        this.onChange(value)
      },
    }
  }


  private onChange(e: T[]) {
    this._value = [...e]
    this.emit('change', [...e])
  }

  private setValue(value: T[]) {
    this.checkboxGroupContext = {
      ...this.checkboxGroupContext,
      value: [...value]
    } as CheckboxGroupContextValue<T>
  }

  protected willUpdate(state: PropertyValueMap<CheckboxGroupProps<T> & { _value: T[] }>) {
    watch(state, {
      _value: () => {
        console.log('_value change')
        this.setValue(this._value ?? [])
      },
      value: () => {
        this._value = [...this.value || []]
        this.setValue(this._value)
      }
    })
  }

  render() {
    return html`
      <slot></slot>
    `
  }
}
