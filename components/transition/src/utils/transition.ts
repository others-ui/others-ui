import { nextFrame } from './nextFrame'

type TransitionOverType = 'end' | 'cancel' | 'noTransition'
export interface TransitionHandler {
  enter?(el: HTMLElement): void
  done?(el: HTMLElement, e: TransitionOverType): void
  run?(el: HTMLElement): void
}

function getStandardTime(time: string): number {
  return parseFloat(time) * 1000
}

/**
 * 这里的解析时间可能有点bug
 * 后面如果有问题需要改改
 */
export function getTransitionDuration(el: HTMLElement): number {
  const durationOrigin = getComputedStyle(el).transitionDuration
  const durationList = durationOrigin
    .trim()
    .split(',')
    .map((item) => item.trim())
  let maxDuration = getStandardTime(durationList[0])

  for (const item of durationList) {
    const time = getStandardTime(item)
    if (time > maxDuration) {
      maxDuration = time
    }
  }
  return maxDuration
}

export function getTransitionDelay(el: HTMLElement): number {
  const delayOrigin = getComputedStyle(el).transitionDelay
  const delayList = delayOrigin
    .trim()
    .split(',')
    .map((item) => item.trim())
  let maxDelay = getStandardTime(delayList[0])

  for (const item of delayList) {
    const time = getStandardTime(item)
    if (time > maxDelay) {
      maxDelay = time
    }
  }
  return maxDelay
}

export function runTransition(el: HTMLElement, handler: TransitionHandler) {
  handler.enter?.(el)
  let property: string[] = []

  let f1, f2, f3, f4

  const remove = () => {
    el.removeEventListener('transitionstart', f1!)
    el.removeEventListener('transitionrun', f2!)
    el.removeEventListener('transitionend', f3!)
    el.removeEventListener('transitioncancel', f4!)
    property = []
  }

  el.addEventListener(
    'transitionrun',
    (f2 = (e: TransitionEvent) => {
      property.push(e.propertyName)
    }),
  )

  el.addEventListener(
    'transitionend',
    (f3 = (e: TransitionEvent) => {
      property = property.filter((i) => i !== e.propertyName)
      if (property.length === 0) {
        handler.done?.(el, 'end')
        remove()
      }
    }),
  )

  el.addEventListener(
    'transitioncancel',
    (f4 = (e: TransitionEvent) => {
      property = property.filter((i) => i !== e.propertyName)
    }),
  )

  nextFrame(() => {
    handler.run?.(el)
    const duration = getTransitionDuration(el)
    const delay = getTransitionDelay(el)

    // 如果不存在transition事件, 则按普通显示和隐藏处理
    if (!duration && !delay) {
      handler.done?.(el, 'noTransition')
      remove()
    }
  })

  return () => {
    handler.done?.(el, 'cancel')
    remove()
  }
}
