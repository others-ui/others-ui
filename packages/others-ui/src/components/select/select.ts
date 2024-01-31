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
  nothing
} from '@others-ui/common'
import styles from './styles/select.scss'
import { watch } from '../../utils/watch'
import { onCssFocusAndBlur } from '../../utils/events'

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

  private rootRef: Ref<HTMLDivElement> = createRef<HTMLDivElement>()
  private inputRef: Ref<HTMLDivElement> = createRef<HTMLDivElement>()
  private boxRef: Ref<HTMLUListElement> = createRef<HTMLUListElement>()

  private get listHeight() {
    return `${this.options.length * 30 + 10}px`
  }

  private setScopeListHeight(height: string) {
    this.rootRef.value?.style.setProperty('--scope-list-height', height)
  }

  protected firstUpdated() {
    this.setScopeListHeight('0')

    if (this.inputRef.value) {
      onCssFocusAndBlur(this.inputRef.value, {
        onFocus: () => {
          if (this.active) {
            const fn = (e: TransitionEvent) => {
              if (e.propertyName === 'height') {
                this.active = false
                this.boxRef.value?.removeEventListener('transitionend', fn)
              }
            }
            this.boxRef.value?.addEventListener('transitionend', fn)
            this.setScopeListHeight('0')
            return
          }

          this.active = true
          setTimeout(() => this.setScopeListHeight(this.listHeight))
        },
        onBlur: () => {
          const fn = (e: TransitionEvent) => {
            if (e.propertyName === 'height') {
              this.active = false
              this.boxRef.value?.removeEventListener('transitionend', fn)
            }
          }
          this.boxRef.value?.addEventListener('transitionend', fn)
          this.setScopeListHeight('0')
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
      return  html`<li class=${classMap({selected: this._value === option.value})} @click=${() => this.onItemClick(option)}>${option.label ?? option.value}</li>`
    }

    return html`
    <div
      class="select"
      ${ref(this.rootRef)}
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
      ${this.active ? html`<div class='select-list'>
        <ul ${ref(this.boxRef)} class=${classMap({'select-list-box': true, 'select-list-box-hover': this.active})}>
          ${this.options.map((option) => renderSelectItem(option))}
        </ul>
      </div>` : nothing}
    </div>
    `
  }
}
