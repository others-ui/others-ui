import {
  css,
  html,
  unsafeCSS,
  PropertyValueMap,
  TemplateResult,
  property,
  state,
  BaseElement,
  ifDefined,
  ref,
  createRef,
  Ref,
  classMap,
} from '@others-ui/common'
import styles from './styles/select.scss'
import { watch } from '../../utils/watch'
import { onCssFocusAndBlur } from '../../utils/events'
import { Transition } from '../transition'

export interface SelectOption<T> {
  label?: string | TemplateResult<1>,
  value: T
}

export interface SelectProps<T> {
  options: SelectOption<T>[]
  value?: T | T[]
  placeholder?: string
}

export class Select<T> extends BaseElement implements SelectProps<T> {
  static componentName: string = 'select'
  static styles = css`${unsafeCSS(styles)}`
  static expressionProperties: string[] = ['options']

  static register() {
    Transition.register()
    super.register()
  }

  @property({type: Array})
  public options: SelectProps<T>['options'] = []

  @property({type: String})
  public value?: T | T[]

  @property({type: String})
  public placeholder?: string

  @state()
  private _value?: T | T[]

  @state()
  private label?: SelectOption<T>['label']

  @state()
  private active: boolean = false

  private inputRef: Ref<HTMLDivElement> = createRef<HTMLDivElement>()

  protected firstUpdated() {
    if (this.inputRef.value) {
      onCssFocusAndBlur(this.inputRef.value, {
        onFocus: () => {

          if (this.active) {
            this.active = false
            return
          }

          this.active = true
        },
        onBlur: () => {
          this.active = false
        }
      })
    }
  }

  onItemClick(option: SelectOption<T>) {
    this.label = option.label ?? (typeof option.value === 'string' ? option.value : undefined)
    this._value = option.value
    this.emit('change', this._value)
  }

  protected willUpdate(state: PropertyValueMap<SelectProps<T>>) {
    watch(state, {
      value: (val) => this._value = val
    })
  }

  render() {
    const renderSelectItem = (option: SelectOption<T>) => {
      return  html`
        <li
          class=${classMap({selected: this._value === option.value})}
          @click=${() => this.onItemClick(option)}>${option.label ?? option.value}
        </li>
      `
    }

    return html`
      <div
        class="select"
      >
        <div
          ${ref(this.inputRef)}
          class=${classMap({'select-active-label': true,'select-active-label-hover': this.active })}
        >
          <div
            class=${classMap({ 'placeholder-color': !this.label, active: this.active })}
          >
            ${ifDefined(this.label || this.placeholder)}
          </div>
        </div>
        <ot-transition .show=${this.active} class="select-list" enterClass='enter-class' leaveClass='leave-class'>
          <ul class='select-list-box'>
            ${this.options.map((option) => renderSelectItem(option))}
          </ul>
        </ot-transition>
      </div>
    `
  }
}
