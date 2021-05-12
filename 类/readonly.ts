class RA {
  readonly name: string
  readonly age: number = 10
}

let r = new RA()
console.log(r.age)
// r.age = 100  // 错误： readonly