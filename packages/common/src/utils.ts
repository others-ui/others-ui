export function parseExpression(expression: string, context: object = {}) {
  const fn = new Function(
    'context',
    `
    with(context) {
      return ${expression}
    }
  `,
  )
  return fn(context)
}
