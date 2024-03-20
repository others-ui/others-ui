import { css, html, unsafeCSS } from '@others-ui/common'
import styles from './styles.scss'
import { BaseElement } from '@others-ui/common'
import { property } from '@others-ui/common'

export interface IconProps {
  svgHtml: string
}

export class Icon extends BaseElement implements IconProps {
  static componentName: string = 'icon'
  static styles = css`
    ${unsafeCSS(styles)}
  `

  @property({ type: String, reflect: true })
  public svgHtml: string = ''

  render() {
    return html` ${this.svgHtml} `
  }
}
