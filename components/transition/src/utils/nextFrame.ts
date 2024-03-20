const raf =
  typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame.bind(window) : setTimeout

export function nextFrame(fn: (...args: any[]) => any) {
  raf(fn)
}
