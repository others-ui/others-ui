import { BaseElement, css, html, property } from '@others-ui/common'
import { runTransition } from '../../utils/transition'

export type TransitionClassName =
  | 'enterClass'
  | 'showClass'
  | 'hideClass'
  | 'leaveClass'


export type TransitionClassProps = {
  [P in TransitionClassName]?: string
}

export interface TransitionProps extends TransitionClassProps {
  show?: boolean
}

/**
 * 通用过渡动画组件
 * 类似于vue的用法
*/
export class Transition extends BaseElement implements TransitionProps {
  static componentName: string = 'transition'
  static styles = css`
    :host {
      display: block;
    }
  `

  @property({type: Boolean, reflect: true})
  public show?: boolean = true

  @property({type: String, reflect: true})
  public enterClass?: string

  @property({type: String, reflect: true})
  public showClass?: string

  @property({type: String, reflect: true})
  public hideClass?: string

  @property({type: String, reflect: true})
  public leaveClass?: string

  private mounted: boolean = false


  private onEnter() {
    this.addClass('enterClass')
  }

  private onShow() {
    this.delClass('enterClass')
    this.addClass('showClass')
  }

  private onHide() {
    this.addClass('hideClass')
  }


  private onLeave() {
    this.addClass('leaveClass')
  }


  protected willUpdate() {
    if (this.show) {
      this.runShow()
    } else {
      if (this.mounted) {
        this.runHide()
      } else {
        this.style.display = 'none'
      }
    }
  }

  protected firstUpdated() {
    this.mounted = true
  }

  addClass(name: TransitionClassName) {
    if (this[name]) {
      this.classList.add(...this[name]!.split(/\s+/))
    }
  }

  delClass(name: TransitionClassName) {
    if (this[name]) {
      this.classList.remove(...this[name]!.split(/\s+/))
    }
  }

  runShow() {
    runTransition(this, {
      enter: () => {
        this.style.display = 'block'
        this.onEnter()
      },
      run: () => this.onShow(),
      done: () => this.delClass('showClass')
    })
  }

  runHide() {
    runTransition(this, {
      enter: () => this.onHide(),
      run: () =>  this.onLeave(),
      done: () => {
        this.delClass('hideClass')
        this.delClass('leaveClass')
        this.style.display = 'none'
      }
    })
  }

  render() {
    return html`<slot></slot>`
  }
}
