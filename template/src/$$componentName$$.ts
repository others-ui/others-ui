import {
  css,
  html,
  unsafeCSS,
  property,
  BaseElement
} from '@others-ui/common'
import styles from './styles/$$componentName$$.scss'


export interface $$globalComponentName$$Props {
  yourFirstProp?: string
}

export class $$globalComponentName$$ extends BaseElement implements $$globalComponentName$$Props {
  static componentName = '$$componentName$$'
  static styles = css`${unsafeCSS(styles)}`

  @property()
  public yourFirstProp?: string

  render() {
    return html`<slot></slot>`
  }
}

