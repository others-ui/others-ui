import { PropertyValueMap, css, html, unsafeCSS } from '@others-ui/common'
import { provide } from '@others-ui/common'
import { FormContext, FormContextValue } from '../../context/FormContext'
import styles from './styles/form.scss'
import { BaseElement } from '@others-ui/common'
import { property, state } from '@others-ui/common'
import { toObject } from '../../utils/convert'
export interface FormProps<T extends Record<string, unknown> = Record<string, unknown>> {
  initialValues?: T
  values?: T
}

export class Form<T extends Record<string, unknown> = Record<string, unknown>>
  extends BaseElement
  implements FormProps
{
  static componentName = 'form'
  static styles = css`
    ${unsafeCSS(styles)}
  `
  static expressionProperties: string[] = ['initialValues']

  // 初始化的状态
  @property({ type: Object, converter: (value) => value && toObject(value) })
  public initialValues?: T

  // 表单状态
  @property({ type: Object })
  public values?: T

  // 真正控制表单渲染的状态
  @state()
  private _values: T = {} as T

  @provide({ context: FormContext })
  @property({ attribute: false })
  private formContext?: FormContextValue<T>

  constructor() {
    super()
  }

  private onSubmit() {
    this.dispatchEvent(new CustomEvent('submit', { detail: { ...this._values } }))
  }

  public submit() {
    this.onSubmit()
  }

  connectedCallback() {
    super.connectedCallback()
    this.init()
  }

  private init() {
    // 初始化
    this._values = this.initialValues || ({} as T)

    // 下发状态
    this.formContext = {
      values: this._values || ({} as T),
      setValue: (name, value) => {
        this._values = { ...this._values, [name]: value }
      },
    }
  }

  protected willUpdate(
    state: PropertyValueMap<FormProps<T> & { _values: T; formContext: FormContextValue<T> }>,
  ) {
    if (state.has('values')) {
      this._values = { ...this.values } as T
    }

    if (state.has('_values') && this.formContext) {
      this.formContext = { ...this.formContext, values: this._values }
    }
  }

  render() {
    return html` <slot></slot> `
  }
}
