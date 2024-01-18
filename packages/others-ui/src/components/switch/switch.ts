import { html, css, unsafeCSS, PropertyValueMap } from 'lit'
import { property, state } from 'lit/decorators.js'
import { BaseElement } from '../../common'
import styles from './styles/switch.scss'
import { createRef, ref } from 'lit/directives/ref.js'
import { FormItemMixin } from '../../mixins/FormMixin'
import { watch } from '../../utils/watch'
import { FormItemContextValue } from '../../context/FormItemContext'

export interface SwitchProps {
  name?: string
  value?: boolean
}

export class Switch extends FormItemMixin<typeof BaseElement, boolean>(BaseElement) implements SwitchProps {
  static componentName: string = 'switch'
  static styles = css`${unsafeCSS(styles)}`

  private inputRef = createRef<HTMLInputElement>()

  @property({type: String})
  public name?: string

  @property({type: Boolean})
  public value?: boolean

  @state()
  public _value?: boolean

  private onInputChange(e: Event) {
    const input = e.target as HTMLInputElement
    this.emit('change', input.checked)
    this.formItemValue = input.checked
  }

  protected willUpdate(
    state: PropertyValueMap<SwitchProps & { _value: string, formItemContext: FormItemContextValue<boolean> }>
  ) {
    watch(state, {
      value: () => {
        this._value = this.value
      },

      formItemContext: () => {
        this._value = this.formItemValue
      }
    })
  }

  render() {
    return html`
      <label class="switch">
        <input
          ${ref(this.inputRef)}
          type="checkbox"
          .checked=${this._value}
          @change=${this.onInputChange}
        />
        <div class="slider" />
      </label>
    `
  }
}
