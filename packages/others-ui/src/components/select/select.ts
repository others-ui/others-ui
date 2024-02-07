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
import { noData } from '../icon/icons/no-data'

export interface SelectOption<T> {
  label?: string | TemplateResult<1>,
  value: T
}

export interface SelectProps<T> {
  options: SelectOption<T>[]
  value?: T | T[]
  placeholder?: string
  search?: boolean
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
  public options: SelectProps<T>['options']

  @property({type: String})
  public value?: T | T[]

  @property({type: String})
  public placeholder?: string

  @property({type: Boolean})
  public search: boolean

  @state()
  private _value?: T | T[]

  @state()
  private label?: SelectOption<T>['label']

  @state()
  private active: boolean = false

  private titleRef: Ref<HTMLDivElement> = createRef<HTMLDivElement>()
  private inputRef: Ref<HTMLInputElement> = createRef<HTMLInputElement>()

  constructor() {
    super()
    this.options = []
    this.search = false
  }

  onItemClick(option: SelectOption<T>) {
    this.label = option.label ?? (typeof option.value === 'string' ? option.value : undefined)
    this._value = option.value

    this.emit('change', this._value)
  }

  onSearch = (e: InputEvent) => {
    this.emit('search', (e.target as HTMLInputElement).value)
  }

  /**
   * life
  */
  protected firstUpdated() {
    if (this.titleRef.value) {
      onCssFocusAndBlur(this.titleRef.value, {
        onFocus: () => {
          this.active = !this.active
          if (this.active) {

            this.updateComplete.then(() => {
              this.inputRef.value?.focus()
            })
          }

        },
        onBlur: () => {
          this.active = false
        }
      })
    }
  }

  protected willUpdate(state: PropertyValueMap<SelectProps<T>>) {
    watch(state, {
      value: (val) => this._value = val
    })
  }

  /**
   * render
  */
  render() {
    const renderSelectItem = (option: SelectOption<T>) => html`
      <li
        class=${classMap({selected: this._value === option.value})}
        @click=${() => this.onItemClick(option)}>${option.label ?? option.value}
      </li>
    `

    const renderList = () => html`
      <ul>
        ${this.options.map((option) => renderSelectItem(option))}
      </ul>
    `

    const renderEmpty = () => html`
      <div class="select-list-box-no-data">
        ${noData}
        <span>暂无数据<span>
      </div>
    `

    const renderInput = () => html`
      <input
        ${ref(this.inputRef)}
        .placeholder=${this.placeholder}
        @input=${this.onSearch}
      />
    `

    const renderNotInput = () => html`
      <div
        class=${classMap({ 'placeholder-color': !this.label, active: this.active })}
      >
        ${ifDefined(this.label || this.placeholder)}
      </div>
    `

    return html`
      <div
        class="select"
      >
        <div
          ${ref(this.titleRef)}
          class=${classMap({'select-active-label': true,'select-active-label-hover': this.active })}
        >
          ${this.search ? (this.active ? renderInput() : renderNotInput()) : renderNotInput()}
        </div>
        <ot-transition .show=${this.active} class="select-list" name="select-list">
          <div class="select-list-box">
            ${this.options.length ? renderList() : renderEmpty()}
          </div>
        </ot-transition>
      </div>
    `
  }
}
