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
  nothing,
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
  filter?: (value: string, selectOptions: SelectOption<T>[]) => SelectOption<T>[]
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

  @property({type: Function})
  public filter?: SelectProps<T>['filter']

  @property({type: Boolean})
  public search: boolean

  @state()
  private _value?: T | T[]

  @state()
  private label?: SelectOption<T>['label']

  @state()
  private active: boolean = false

  @state()
  private inputValue: string = ''

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
    const value =  (e.target as HTMLInputElement).value
    this.inputValue = value
    this.emit('search', value)
  }

  /**
   * 动画结束后再恢复
  */
  onListHide = (e: CustomEvent) => {
    if (e.detail === 'end') {
      this.inputValue = ''
      this.emit('search', this.inputValue)
    }
  }

  get filterOptions() {
    return this.filter
      ? this.filter(this.inputValue, this.options)
      : this.options
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
        class=${classMap({'select-item-selected': this._value === option.value})}
        @click=${() => this.onItemClick(option)}>${option.label ?? option.value}
      </li>
    `

    const renderList = () => html`
      <ul>
        ${this.filterOptions.map((option) => renderSelectItem(option))}
      </ul>
    `


    const renderEmpty = () => html`
      <div class="select-list-box-no-data">
        ${noData}
        <span>暂无数据<span>
      </div>
    `

    const renderPlaceholder = () => {
      // to change!
      const result = this.search
        ? (this._value
          ? (this.active
            ? (this.inputValue
              ? nothing
              : this.label)
            : nothing)
          : (this.inputValue
            ? nothing
            : this.placeholder))
        : (this._value
          ? nothing
          : this.placeholder)

      return html`
        <div class="select-input-placeholder">
          ${ifDefined(result)}
        </div>
      `
    }

    const renderInput = () => html`
      <input
        .value=${this.inputValue}
        ${ref(this.inputRef)}
        @input=${this.onSearch}
      />
    `

    const renderLabel = () => html`
      <div class="select-input-container-label">
        <span class=${classMap({'select-placeholder-color': this.active})}>${this.label}<span>
      </div>
    `


    const renderContainer = () => this.search
      ? (this.active ? renderInput() : renderLabel())
      : renderLabel()


    return html`
      <div class="select">
        <div
          ${ref(this.titleRef)}
          class=${classMap({'select-input': true,'select-active-border': this.active })}
        >
          ${renderPlaceholder()}
          <div class="select-input-container">${renderContainer()}</div>
        </div>

        <ot-transition .show=${this.active} class="select-list" name="select-list" @hideover=${this.onListHide}>
          <div class="select-list-box">
            ${this.filterOptions.length ? renderList() : renderEmpty()}
          </div>
        </ot-transition>
      </div>
    `
  }
}
