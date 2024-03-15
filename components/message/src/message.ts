import { css, html, unsafeCSS } from '@others-ui/common'
import { property } from '@others-ui/common'
import styles from './styles/message.scss'
import { BaseElement } from '@others-ui/common'
import { Transition } from '@others-ui/transition'

export interface MessageProps {
  show?: boolean
}


export class Message extends BaseElement implements MessageProps {

  static register() {
    Transition.register()
    super.register()
  }

  static componentName = 'message'
  static styles = css`${unsafeCSS(styles)}`

  @property({type: Boolean})
  public show = false

  render() {
    return html`
        <ot-transition .show=${this.show} name="message" @hideover=${() => this.emit('hide')}>
          <span>
            <slot></slot>
          <span>
        </ot-transition>
      `
  }
}

export const message = {
  success(text: string, duration: number = 2000) {
    const instance = new Message()
    instance.appendChild(document.createTextNode(text))
    const container = document.body || document
    container.appendChild(instance)
    setTimeout(() => {
      instance.show = true
    })
    setTimeout(() => {
      instance.show = false
      instance.addEventListener('hide', () => {
        instance.remove()
      })
    }, duration)
  }
}
