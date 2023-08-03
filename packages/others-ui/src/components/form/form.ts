import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'
import styles from './styles.scss'

export interface FormProps {
 
}

@customElement('ot-form')
export class Form extends LitElement implements FormProps {

  static styles = css`${unsafeCSS(styles)}`

  render() {  
    return html`<slot></slot>`
  }
}