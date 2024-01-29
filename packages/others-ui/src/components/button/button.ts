import { css, html, nothing, unsafeCSS } from 'lit'
import { property } from 'lit/decorators.js'
import styles from './styles/button.scss'
import { loading } from '../icon/icons/loading'
import { BaseElement } from '../../common'

export interface ButtonProps {
  type?: 'primary' | 'success' | 'warn' | 'error',
  size?: 'large' | 'middle' | 'small'
  block?: boolean
  disabled?: boolean
  loading?: boolean
  // 联动表单 后续规划
  submit?: boolean
}

export class Button extends BaseElement implements ButtonProps {
  static componentName: string = 'button'
  static styles = css`${unsafeCSS(styles)}`

  @property({type: String, reflect: true})
  public type: ButtonProps['type']

  @property({type: String, reflect: true})
  public size: ButtonProps['size']

  @property({type: Boolean, reflect: true})
  public block: boolean = false

  @property({type: Boolean, reflect: true})
  public disabled: boolean = false

  @property({type: Boolean})
  public loading: boolean = false

  @property({type: Boolean})
  public submit: boolean = false

  protected eventAgent: Record<string, boolean | ((this: this, e: Event) => boolean)> = {
    click() {
      return !(this.loading || this.disabled)
    }
  }

  constructor() {
    super()
    this.startProxyOnEventListener()
  }

  render() {
    return html`
      <div>
        ${this.loading ? loading : nothing}
        <slot></slot>
      </div>
    `
  }
}
