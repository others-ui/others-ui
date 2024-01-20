function getWindow(): Window | typeof globalThis {
  if (typeof window !== 'undefined') {
    return window
  } else if (typeof global !== 'undefined') {
    return global
  } else if (typeof globalThis !== 'undefined') {
    return globalThis
  } else {
    return null!
  }
}

const g = getWindow() as typeof window

g.log = (...args: any[]) => {
  if (__DEV__) {
    g.console.log(...args)
  }
}
g.warn = g.console.warn
g.info = g.console.info
