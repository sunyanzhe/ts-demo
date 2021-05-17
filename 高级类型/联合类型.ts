function padLeft(value: string, padding: string | number): string {
  if (typeof padding === 'string') {
    return new Array(padding + 1).join(' ') + value
  }
  if (typeof padding === 'number') {
    return `${padding}  value`
  }
  throw new Error()
}