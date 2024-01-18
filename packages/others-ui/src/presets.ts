window.log = (...args: any[]) => {
  if (__DEV__) {
    window.console.log(...args)
  }
}
window.warn = window.console.warn
window.info = window.console.info
