function toHex(this: number) {
  return this.toString(16)
}
function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n)
}

numberToString(1)

type AAAA = typeof toHex

type MyThisParameterType<T> = T extends (this: infer P, ...args: any[]) => any ? P : never

function mynumberToString(n: MyThisParameterType<typeof toHex>) {
  return toHex.apply(n)
}

mynumberToString(1)
