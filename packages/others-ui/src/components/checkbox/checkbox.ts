import { PropertyValueMap, css, html, unsafeCSS } from '@others-ui/common'
import { property, state } from '@others-ui/common'
import { BaseElement } from '@others-ui/common'
import styles from './styles/checkbox.scss'
import { consume } from '@others-ui/common'
import {
  CheckboxGroupContext,
  CheckboxGroupContextType,
  CheckboxGroupContextValue,
} from './GroupContext'
import { watch } from '../../utils/watch'

export interface CheckboxProps<T> {
  checked?: boolean
  value?: T
}

export class Checkbox<T = unknown> extends BaseElement implements CheckboxProps<T> {
  static componentName = 'checkbox'
  static styles = css`
    ${unsafeCSS(styles)}
  `

  @consume({ context: CheckboxGroupContext as CheckboxGroupContextType<T>, subscribe: true })
  @property({ attribute: false })
  private checkboxGroupContext?: CheckboxGroupContextValue<T>

  @property({ type: Boolean })
  public checked?: boolean

  @property()
  public value?: T

  @state()
  private isChecked?: boolean

  get groupValue() {
    return this.checkboxGroupContext?.value ?? []
  }

  set groupValue(value: T[]) {
    this.checkboxGroupContext?.setValue(value)
  }

  private onChange(e: Event) {
    const input = e.target as HTMLInputElement
    this.emit('change', input.checked)

    if (this.value !== undefined) {
      if (input.checked) {
        this.groupValue = [...this.groupValue, this.value]
      } else {
        this.groupValue = this.groupValue.filter((item) => item !== this.value)
      }
    }
  }

  protected willUpdate(
    state: PropertyValueMap<
      CheckboxProps<T> & { checkboxGroupContext: CheckboxGroupContextValue<T> }
    >,
  ) {
    watch(state, {
      checkboxGroupContext: () => {
        if (this.value !== undefined) {
          if (this.groupValue.includes(this.value)) {
            this.isChecked = true
          } else {
            this.isChecked = false
          }
        }
      },
      checked: () => {
        this.isChecked = this.checked
      },
    })
  }

  render() {
    return html`
      <label class="container">
        <input type="checkbox" .checked=${this.isChecked} @change=${this.onChange} />
        <div class="checkbox"></div>
        <span class="text">
          <slot></slot>
        </span>
      </label>
    `
  }
}
