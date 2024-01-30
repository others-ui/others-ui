
export function toObject(value: string): object | null {
  try {
    return JSON.parse(value)
  } catch {
    warn(
      'The attribute you passed in does not conform to JSON format!'
    )
    return null
  }
}

export function parseExpression(expression: string, context: object = {}) {
  const fn = new Function('context', `
    with(context) {
      return ${expression}
    }
  `)
  return fn(context)
}
