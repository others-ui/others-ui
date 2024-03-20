export interface CssFocusAndBlurEvents {
  onFocus?(e: MouseEvent): void
  onBlur?(e: MouseEvent): void
}

/**
 * 模拟css的focus和blur
 */
export function onCssFocusAndBlur(el: HTMLElement, handler: CssFocusAndBlurEvents) {
  el.addEventListener('click', (e) => {
    handler.onFocus?.(e)
    e.stopPropagation()
  })

  document.addEventListener('click', (e) => {
    handler.onBlur?.(e)
  })

  // remove
  return () => {
    el.removeEventListener('click', handler.onFocus!)
    document.removeEventListener('click', handler.onBlur!)
  }
}
