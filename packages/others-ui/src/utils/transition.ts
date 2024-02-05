import { nextFrame } from './nextFrame'

export interface TransitionHandler {
  enter?(el: HTMLElement): void
  done?(el: HTMLElement, e: TransitionEvent | null): void
  run?(el: HTMLElement): void
}

export interface TransitionOptions {
  auto?: boolean
  delay?: number
  remove?: boolean
}

export function onTransition(el: HTMLElement, handler: TransitionHandler, options: TransitionOptions = {}) {

  options.remove ??= false
  let timer

  const fn = (e: TransitionEvent) => {
    handler.done?.(el, e)
    options.remove && run.remove()
  }

  const cancelFn = () => {
    clearTimeout(timer!)
    options.remove && run.remove()
  }

  el.addEventListener('transitionend', fn)
  el.addEventListener('transitioncancel', cancelFn)

  const run = () => {
    clearTimeout(timer!)
    handler.enter?.(el)
    timer = setTimeout(() => {
      handler.run?.(el), options.delay
    })
  }

  run.remove = () => {
    el.removeEventListener('transitionend', fn)
    el.removeEventListener('transitioncancel', cancelFn)
  }

  options.auto && run()

  return run
}

export function runTransition(el: HTMLElement, handler: TransitionHandler) {
  handler.enter?.(el)
  let isTransitionDone = false
  nextFrame(() => {
    let check
    el.addEventListener('transitionrun', check = () => {
      isTransitionDone = true
    })

    let fn
    el.addEventListener('transitionend', fn = (e: TransitionEvent) => {
      isTransitionDone = true
      handler.done?.(el, e)
      el.removeEventListener('transitionrun', check!)
      el.removeEventListener('transitioncancel', fn2!)
      el.removeEventListener('transitionend', fn!)
    })
    let fn2
    el.addEventListener('transitioncancel', fn2 = () => {
      isTransitionDone = true
      el.removeEventListener('transitionrun', check!)
      el.removeEventListener('transitionend', fn!)
      el.removeEventListener('transitioncancel', fn2!)
    })
    handler.run?.(el)

    nextFrame(() => {
      if (!isTransitionDone) {
        handler.done?.(el, null)
        el.removeEventListener('transitionrun', check!)
        el.removeEventListener('transitionend', fn!)
        el.removeEventListener('transitioncancel', fn2!)
      }
    })
  })
}
