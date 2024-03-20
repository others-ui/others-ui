import { css, html, unsafeCSS } from '@others-ui/common'
import { property } from '@others-ui/common'
import styles from './styles.scss'
import { BaseElement } from '@others-ui/common'

export interface SpaceProps {
  direction?: 'vertical' | 'horizontal'
}

export class Space extends BaseElement implements SpaceProps {
  static componentName: string = 'space'

  static styles = css`
    ${unsafeCSS(styles)}
  `

  @property({ type: String, reflect: true })
  public direction: SpaceProps['direction'] = 'horizontal'

  render() {
    return html`<slot></slot>`
  }
}
