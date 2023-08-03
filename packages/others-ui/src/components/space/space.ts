import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import styles from './styles.scss'

export interface SpaceProps {
  direction?: 'vertical' | 'horizontal'
}

@customElement('ot-space')
export class Space extends LitElement implements SpaceProps {
  static styles = css`${unsafeCSS(styles)}`

  @property({type: String, reflect: true}) direction: SpaceProps['direction'] = 'horizontal'

  render() {
    return html`<slot></slot>`
  }
}