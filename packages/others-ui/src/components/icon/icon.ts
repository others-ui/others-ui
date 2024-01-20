import { css, html, unsafeCSS } from 'lit'
import styles from './styles.scss'
import { BaseElement } from '../../common'
import { property } from 'lit/decorators.js'

export interface IconProps {
  svgHtml: string
}

export class Icon extends BaseElement implements IconProps {
  static componentName: string = 'icon'
  static styles = css`${unsafeCSS(styles)}`

  @property({type: String, reflect: true})
  public svgHtml: string = ''

  render() {
    return html`
      ${this.svgHtml}
    `
  }
}
