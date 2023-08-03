import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import styles from './styles.scss'

export interface ButtonProps {
  type?: 'primary' | 'dashed' | 'default',
  block?: boolean
  disabled?: boolean
  loading?: boolean
  size?: string
  htmlType?: 'submit' | 'reset'
}

@customElement('ot-button')
export class Button extends LitElement implements ButtonProps {

  static styles = css`${unsafeCSS(styles)}`

  @property({type: String}) type: ButtonProps['type'] = 'default'
  @property({type: String}) size: ButtonProps['size'] = 'default'
  @property({type: Boolean, reflect: true}) block: boolean = false
  @property({type: String, attribute: 'html-type'}) htmlType?: ButtonProps['htmlType']
  @property({type: Boolean}) disabled: boolean = false

  render() {  
    return html`
      <button 
        type=${this.type}
        size=${this.size}
        ?block=${this.block}
        ?disabled=${this.disabled}
        @click=${(e: PointerEvent) => this.onClick(e)}
      >
        <slot></slot>
      </button>
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