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
import { FormItemMixin } from '../../mixins/FormMixin'
import { FormItemContextValue } from '../../context/FormItemContext'


export interface CheckboxGroupProps<T> {
  value?: T[]
}


export class CheckboxGroup<T> extends FormItemMixin<typeof BaseElement, unknown[]>(BaseElement) implements CheckboxGroupProps<T> {
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
        this.checkboxGroupContext = {
          ...this.checkboxGroupContext!,
          value: [...value]
        }
      },
    }
  }


  private onChange(e: T[]) {
    this.formItemValue = [...e]
    this._value = [...e]
    this.emit('change', [...e])
  }

  private setValue(value: T[]) {
    this.checkboxGroupContext = {
      ...this.checkboxGroupContext,
      value: [...value]
    } as CheckboxGroupContextValue<T>
  }

  protected willUpdate(state: PropertyValueMap<CheckboxGroupProps<T> & { _value: T[], formItemContext: FormItemContextValue<T[]> }>) {
    watch(state, {
      formItemContext: () => {
        log('formItemContext')
        this._value = [...this.formItemValue as T[] || []]
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
