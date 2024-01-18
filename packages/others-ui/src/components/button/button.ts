import { css, html, nothing, unsafeCSS } from 'lit'
import { property } from 'lit/decorators.js'
import styles from './styles/button.scss'
import { loading } from '../icon/loading'
import { BaseElement } from '../../common'

export interface ButtonProps {
  type?: 'primary' | 'success' | 'warn' | 'error',
  size?: 'large' | 'middle' | 'small'
  block?: boolean
  disabled?: boolean
  loading?: boolean
  // 联动表单
  submit?: boolean
}

export class Button extends BaseElement implements ButtonProps {
  static componentName: string = 'button'
  static styles = css`${unsafeCSS(styles)}`

  @property({type: String, reflect: true})
  public type: ButtonProps['type']

  @property({type: String, reflect: true})
  public size: ButtonProps['size'] = 'middle'

  @property({type: Boolean, reflect: true})
  public block: boolean = false

  @property({type: Boolean, reflect: true})
  public disabled: boolean = false

  @property({type: Boolean})
  public loading: boolean = false

  @property({type: Boolean})
  public submit: boolean = false

  // 拦截自定义事件
  addEventListener(
    type: keyof HTMLElementEventMap,
    listener: (e: Event) => void
  ) {
    super.addEventListener(type, (e) => {
      if (type == 'click' && (this.loading || this.disabled)) {
        return
      }
      listener.call(this, e)
    })
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
