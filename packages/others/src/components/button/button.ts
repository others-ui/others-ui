import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import styles from './styles.scss'

@customElement('ot-button')
export default class Button extends LitElement {

  static styles = css`${unsafeCSS(styles)}`

  @property({type: String})
    type: string = 'default'

  render() {  
    return html`<slot></slot>`
  }
}