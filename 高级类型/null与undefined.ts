function f(x: number, y?: number) {
  return x + (y ?? 0)
}


f(1, 2)
f(1)
f(1, undefined)
f(1, null) // error

let asds = 'string'
asds = null // error


class CC {
  a: number;
  b?: number;
}

let cc = new CC()
cc.a = 12
cc.a = undefined // error, undefined is not assignable to number

cc.b = 13
cc.b = undefined
cc.b = null // error

