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
  display?: CSSStyleDeclaration['display']
  name?: string
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
  public show: boolean = true

  @property({type: String, reflect: true})
  public display?: string

  @property({type: String, reflect: true})
  public name?: string

  @property({type: String})
  public enterClass?: string

  @property({type: String})
  public showClass?: string

  @property({type: String})
  public hideClass?: string

  @property({type: String})
  public leaveClass?: string

  private mounted: boolean = false

  private initDisplay?: string

  private removeFn?: () => void

  get _display() {
    return this.display
      ? this.display
      : this.initDisplay
  }

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
    this.removeFn?.()
    if (this.show) {
      this.runShow()
    } else {
      if (this.mounted) {
        this.runHide()
      } else {
        this.hideHostElement()
      }
    }
  }

  protected firstUpdated() {
    this.mounted = true
  }

  connectedCallback() {
    super.connectedCallback()
    this.initDisplay = getComputedStyle(this).display
  }

  private addClass(className: TransitionClassName) {
    if (this[className]) {
      this.classList.add(...this[className]!.split(/\s+/))
      return
    }

    if (this.name) {
      const newClassName = `${this.name}-${getKebabCase(className)}`
      this.classList.add(newClassName)
    }
  }

  private delClass(className: TransitionClassName) {
    if (this[className]) {
      this.classList.remove(...this[className]!.split(/\s+/))
      return
    }

    if (this.name) {
      const newClassName = `${this.name}-${getKebabCase(className)}`
      this.classList.remove(newClassName)
    }
  }

  private runShow() {
    this.removeFn = runTransition(this, {
      enter: () => {
        this.showHostElement()
        this.onEnter()
      },
      run: () => this.onShow(),
      done: () => this.delClass('showClass')

    })
  }

  private runHide() {
    this.removeFn = runTransition(this, {
      enter: () => this.onHide(),
      run: () =>  this.onLeave(),
      done: () => {
        this.delClass('hideClass')
        this.delClass('leaveClass')
        this.hideHostElement()
      }
    })
  }

  private showHostElement() {
    this.style.display = this._display || 'block'
  }

  private hideHostElement() {
    this.style.display = 'none'
  }

  render() {
    return html`<slot></slot>`
  }
}


function getKebabCase(value: string) {
  return value.replace(/[A-Z]/g, (item) => {
    return '-' + item.toLowerCase()
  })
}
