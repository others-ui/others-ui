import { css, html, unsafeCSS } from '@others-ui/common'
import { property } from '@others-ui/common'
import styles from './styles/message.scss'
import { BaseElement } from '@others-ui/common'
import { Transition } from '@others-ui/transition'

export interface MessageProps {
  show?: boolean
}

export class Message extends BaseElement implements MessageProps {
  static stack: Message[] = []

  static register() {
    Transition.register()
    super.register()
  }

  static componentName = 'message'
  static styles = css`
    ${unsafeCSS(styles)}
  `

  @property({ type: Boolean })
  public show = false

  render() {
    return html`
        <ot-transition display="block" .show=${this.show} name="message" @hideover=${() => this.emit('hide')}>
          <span>
            <slot></slot>
          <span>
        </ot-transition>
      `
  }
}

const calcTop = () => {
  let init = 100
  const messages = Message.stack
  messages.forEach((message) => {
    message.style.top = `${init}px`
    init += 50
  })
}

export const message = {
  success(text: string, duration: number = 2000) {
    const instance = new Message()
    instance.appendChild(document.createTextNode(text))
    instance.show = true
    const container = document.body || document
    container.appendChild(instance)
    Message.stack.push(instance)

    if (Message.stack.length > 15) {
      const m = Message.stack.shift()
      if (m) {
        m.show = false
      }
    }

    calcTop()

    setTimeout(() => {
      instance.addEventListener('hide', () => {
        instance.remove()
        const index = Message.stack.findIndex((value) => value === instance)
        Message.stack.splice(index, 1)
        calcTop()
      })
      instance.show = false
    }, duration)
  },
}
