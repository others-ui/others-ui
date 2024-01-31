import {
  css,
  html,
  nothing,
  unsafeCSS,
  property,
  BaseElement,
  EventAgent,
} from '@others-ui/common'
import styles from './styles/button.scss'
import { loading } from '../icon/icons/loading'

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
  static eventAgent: EventAgent<Button> = {
    click() {
      return !(this.loading || this.disabled)
    }
  }

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

  render() {
    return html`
      <div>
        ${this.loading ? loading : nothing}
        <slot></slot>
      </div>
    `
  }
}
