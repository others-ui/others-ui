import { css, html, unsafeCSS } from '@others-ui/common'
import { property, state } from '@others-ui/common'
import styles from './styles/select.scss'
import { BaseElement } from '@others-ui/common'
import { ifDefined } from '@others-ui/common'

export interface SelectOptions {
  label?: string,
  value: string
}

export interface SelectProps {
  options: SelectOptions[]
  value?: string
}

export class Select extends BaseElement implements SelectProps {
  static componentName: string = 'select'
  static styles = css`${unsafeCSS(styles)}`
  static expressionProperties: string[] = ['options']

  @property({type: Array})
  public options: SelectProps['options'] = []

  @property({type: String})
  public value?: string

  @state()
  private _value?: string

  @state()
  private label?: string

  onItemClick(option: SelectOptions) {
    this.label = option.label ?? option.value
    this._value = option.value
    this.emit('change', this._value)
  }


  render() {
    return html`
    <div class="select">
      <div class="select-active">
        ${ifDefined(this.label)}
      </div>
      <ul class="select-list">
        ${this.options.map((option) => renderSelectItem.call(this, option))}
      </ul>
    </div>
    `
  }
}

function renderSelectItem(this: Select, option: SelectOptions) {
  return  html`<li @click=${() => this.onItemClick(option)}>${option.label ?? option.value}</li>`
}
