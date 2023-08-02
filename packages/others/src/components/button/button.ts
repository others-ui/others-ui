import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import styles from './styles.scss'

export interface ButtonProps {
  type?: 'primary' | 'dashed' | 'default',
  block?: boolean
  disabled?: boolean
  loading?: boolean
  size?: string
}

@customElement('ot-button')
export class Button extends LitElement implements ButtonProps {

  static styles = css`${unsafeCSS(styles)}`

  @property({type: String, reflect: true})
    type: ButtonProps['type'] = 'default'

  render() {  
    return html`<slot></slot>`
  }
}