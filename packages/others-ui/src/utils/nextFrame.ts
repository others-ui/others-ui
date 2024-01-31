const raf = window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout

export function nextFrame (fn: (...args: any[]) => any) {
  raf(() => {
    raf(fn)
  })
}
