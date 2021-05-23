function toHex2(this: number) {
  return this.toString(16)
}


const fiveToHex:OmitThisParameter<typeof toHex2> = toHex2.bind('1')

// 手写