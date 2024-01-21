import { css, html, unsafeCSS } from 'lit'
import { property, state } from 'lit/decorators.js'
import styles from './styles/radio.scss'
import { BaseElement } from '../../common'

export interface RadioProps<T> {
    checked?: boolean
    value?: T
  }

export class Radio<T> extends BaseElement implements RadioProps<T> {
  static componentName: string = 'radio'
  static styles = css`${unsafeCSS(styles)}`

  @property({type: Boolean})
  public checked?: boolean

  @property()
  public value?: T

  @state()
  private isChecked?: boolean

  constructor() {
    super()
    this.isChecked = false
  }

  render() {
    return html`
      <label class="container">
      <input type="radio" .checked=${this.isChecked}/>
        <div class="radio"></div>
        <span class="text">
          <slot></slot>
        </span>
      </label>
    `
  }
}