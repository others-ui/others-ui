import { PropertyValueMap, css, html, unsafeCSS } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { property, state } from 'lit/decorators.js'
import styles from './styles/input.scss'
import { BaseElement } from '../../common'
import { FormItemContextValue } from '../../context/FormItemContext'
import { watch } from '../../utils/watch'
import { FormItemMixin } from '../../mixins/FormMixin'

export interface InputProps {
 placeholder?: string
 name?: string
 value?: string
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

  render() {
    return html`
      <div class="container">
        <input
          .placeholder=${ifDefined(this.placeholder)}
          @input=${this.onInput}
          .value=${ifDefined(this._value)}
        />
      </div>
    `
  }
}
