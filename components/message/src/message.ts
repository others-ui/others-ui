import { css, html, unsafeCSS } from '@others-ui/common'
// import { property } from '@others-ui/common'
import styles from './styles/message.scss'
import { BaseElement } from '@others-ui/common'



export class Message extends BaseElement {
  static componentName = 'message'
  static styles = css`${unsafeCSS(styles)}`

  render() {
    return html`<slot></slot>`
  }
}

export const message = {
  success() {

  }
}
