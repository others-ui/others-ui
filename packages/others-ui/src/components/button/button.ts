import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { prefix } from '../../common'
import styles from './styles.scss'

export interface ButtonProps {
  type?: 'primary' | 'dashed' | 'default',
  block?: boolean
  disabled?: boolean
  loading?: boolean
  size?: 'large' | 'middle' | 'small'
  htmlType?: 'submit' | 'reset'
}

@customElement(`${prefix}-button`)
export class Button extends LitElement implements ButtonProps {

  static styles = css`${unsafeCSS(styles)}`

  @property({type: String}) type: ButtonProps['type'] = 'default'
  @property({type: String}) size: ButtonProps['size'] = 'middle'
  @property({type: Boolean, reflect: true}) block: boolean = false
  @property({type: String, attribute: 'html-type'}) htmlType?: ButtonProps['htmlType']
  @property({type: Boolean}) disabled: boolean = false

  render() {  
    return html`
      <span 
        part="button"
        id="button"
        type=${ifDefined(this.type)}
        size=${ifDefined(this.size)}
        ?block=${this.block}
        ?disabled=${this.disabled}
        @click=${(e: PointerEvent) => this.onClick(e)}
      >
        <slot></slot>
      </span>
    `
  }

  onClick(event: PointerEvent) {
    if (this.disabled) {
      event.stopPropagation()
      return
    }
    if (this.htmlType === 'submit') {
      this.dispatchEvent(new SubmitEvent('submit', { bubbles: true }))
    }
  }
}