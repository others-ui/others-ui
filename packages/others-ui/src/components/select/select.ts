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
  classMap
} from '@others-ui/common'
import styles from './styles/select.scss'
import { watch } from '../../utils/watch'

export interface SelectOptions {
  label?: string | TemplateResult<1>,
  value: string
}

export interface SelectProps {
  options: SelectOptions[]
  value?: string
  placeholder?: string
}

export class Select extends BaseElement implements SelectProps {
  static componentName: string = 'select'
  static styles = css`${unsafeCSS(styles)}`
  static expressionProperties: string[] = ['options']

  @property({type: Array})
  public options: SelectProps['options'] = []

  @property({type: String})
  public value?: string

  @property({type: String})
  public placeholder?: string

  @state()
  private _value?: string

  @state()
  private label?: SelectOptions['label']

  @state()
  private active: boolean = false

  private rootRef: Ref<HTMLDivElement> = createRef<HTMLDivElement>()

  private get listHeight() {
    return `${this.options.length * 30 + 10}px`
  }

  private setScopeListHeight(height: string) {
    this.rootRef.value?.style.setProperty('--scope-list-height', height)
  }

  protected firstUpdated() {
    this.setScopeListHeight(this.listHeight)

    // 模拟active
    let timer: NodeJS.Timer | null = null

    const startActive = () => {
      timer = setInterval(() => this.active = !this.active, 500)
      let fn
      document.addEventListener('click', fn = () => {
        this.active = false
        clearInterval(timer!)
        timer = null
        document.removeEventListener('click', fn!)
      })
    }

    this.rootRef.value?.addEventListener('click', (e) => {
      if (!timer) {
        startActive()
      }
      e.stopPropagation()
    })
  }

  onItemClick(option: SelectOptions) {
    this.label = option.label ?? option.value
    this._value = option.value
    this.emit('change', this._value)
    this.setScopeListHeight('0')

    setTimeout(() => {
      this.setScopeListHeight(this.listHeight)
    }, 300)
  }

  protected willUpdate(state: PropertyValueMap<SelectOptions>) {
    watch(state, {
      value: (val) => this._value = val
    })
  }

  render() {
    return html`
    <div
      class="select"
      ${ref(this.rootRef)}
    >
      <div class="select-active-label" @click=${() => this.active = true}>
        <div
          class=${classMap({ 'placeholder-color': !this.label, active: this.active })}
        >
          ${ifDefined(this.label || this.placeholder)}
        </div>
      </div>
      <div class="select-list">
        <ul class="select-list-box">
          ${this.options.map((option) => renderSelectItem.call(this, option))}
        </ul>
      </div>
    </div>
    `
  }
}

function renderSelectItem(this: Select, option: SelectOptions) {
  return  html`<li @click=${() => this.onItemClick(option)}>${option.label ?? option.value}</li>`
}
