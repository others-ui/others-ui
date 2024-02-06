import { PropertyValueMap, css, html, unsafeCSS } from 'lit'
import { property, state } from 'lit/decorators.js'
import { BaseElement } from '../../common'
import styles from './styles/radio.scss'
import { consume } from '@lit/context'
import { RadioGroupContext, RadioGroupContextType, RadioGroupContextValue } from './RadioGroupContext'
import { watch } from '../../utils/watch'


export interface RadioProps<T> {
  checked?: boolean
  value?: T
}

export class Radio<T> extends BaseElement implements RadioProps<T> {
  static componentName: string = 'radio'
  static styles = css`${unsafeCSS(styles)}`
  @consume({ context: RadioGroupContext as RadioGroupContextType<T>, subscribe: true })
  @property({ attribute: false })
  private radioGroupContext?: RadioGroupContextValue<T>
  @property({ type: Boolean })
  public checked?: boolean

  @property()
  public value?: T

  @state()
  private isChecked?: boolean
  get groupValue() {
    return this.radioGroupContext?.value as any
  }

  set groupValue(value: T) {
    this.radioGroupContext?.setValue(value)
  }
  private onChange(e: Event) {
    const targetEle = e.target as HTMLInputElement
    this.emit('change', targetEle.checked)
    if (this.value !== undefined) {
      if (targetEle.checked) {
        this.groupValue = this.value
      }
    }
  }
  protected willUpdate(state: PropertyValueMap<RadioProps<T> & { radioGroupContext: RadioGroupContextValue<T> }>) {
    watch(state, {
      radioGroupContext: () => {
        if (this.value !== undefined) {
          if (this.groupValue === this.value) {
            this.isChecked = true
          } else {
            this.isChecked = false
          }
        }
      },
      checked: () => {
        this.isChecked = this.checked
      }
    })
  }
  render() {
    return html`
      <label class="container">
      <input type="radio" .checked=${this.isChecked} @change=${this.onChange}/>
        <div class="radio"></div>
        <span class="text">
          <slot></slot>
        </span>
      </label>
    `
  }
}