import { css, html, unsafeCSS } from 'lit'
import { property } from 'lit/decorators.js'
import styles from './styles.scss'
import { BaseElement } from '../../common'

export interface SpaceProps {
  direction?: 'vertical' | 'horizontal'
}

export class Space extends BaseElement implements SpaceProps {
  static componentName: string = 'space'

  static styles = css`${unsafeCSS(styles)}`

  @property({type: String, reflect: true}) direction: SpaceProps['direction'] = 'horizontal'

  render() {
    return html`<slot></slot>`
  }
}
