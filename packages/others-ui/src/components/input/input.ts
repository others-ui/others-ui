import { PropertyValueMap, css, html, unsafeCSS } from '@others-ui/common'
import { ifDefined } from '@others-ui/common'
import { property, state } from '@others-ui/common'
import styles from './styles/input.scss'
import { BaseElement } from '@others-ui/common'
import { FormItemContextValue } from '../../context/FormItemContext'
import { watch } from '../../utils/watch'
import { FormItemMixin } from '../../mixins/FormMixin'
export interface InputProps {
 placeholder?: string
 name?: string
 value?: string
 disabled?: boolean
 maxLength?: number
 size?: 'small' | 'medium' | 'large'
 clearable?: boolean;
}

export class Input extends FormItemMixin<typeof BaseElement, string>(BaseElement) implements InputProps {
  static componentName: string = 'input'
  static styles = css`${unsafeCSS(styles)}`

  @property({type: String})
  public name?: string

  @property({type: String})
  public value?: string

  @property({type: String})
  public placeholder?: string

  @property({type: Boolean})
  public disabled?: boolean = false

  @property({type: Number})
  public maxLength?: number

  @property({type: String})
  public size?: InputProps['size'] = 'medium'

  @property({type: Boolean, reflect: true})
  public clearable?: boolean = false

  @state()
  public _value?: string

  constructor() {
    super()
  }

  private onInput(e: InputEvent) {
    const value = (e.target as HTMLInputElement).value
    this.formItemValue = value
    this.dispatchEvent(
      new CustomEvent('input', {detail: value})
    )
    this._value = value
  }

  protected willUpdate(state: PropertyValueMap<InputProps & { _value: string, formItemContext: FormItemContextValue<string> }>): void {
    watch(state, {
      formItemContext: () => {
        this._value = this.formItemValue
      },
    })

    if (state.has('value')) {
      this._value = this.value
    }
  }

  private clearInput() {
    this._value = ''
    this.formItemValue = ''
    this.dispatchEvent(new CustomEvent('input', { detail: '' }))
  }
  render() {
    return html`
      <div class="container">
        <input
          class=${`size-${this.size}`}
          maxlength=${ifDefined(this.maxLength)}
          .placeholder=${ifDefined(this.placeholder)}
          @input=${(e: InputEvent) => this.onInput(e)}
          .value=${ifDefined(this._value)}
          ?disabled=${this.disabled}
        />
        ${this.clearable && !this.disabled && this._value !== undefined && this._value !== '' ? html`
        <button size="small"
          @click=${this.clearInput}>
          x
        </button>
      ` : null}
      </div>
    `
  }
}
