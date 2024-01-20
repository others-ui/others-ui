
export function toObject(value: string): object | null {
  console.log('value', value)

  try {
    return JSON.parse(value)
  } catch {
    warn(
      'The attribute you passed in does not conform to JSON format!'
    )
    return null
  }
}
