interface ExPartFoo {
  name: string,
  age: number
}

let extodo1: ExPartFoo = {
  name: 'syz',
  age: 123
}

let extodo2: Partial<ExPartFoo> = {
  name: 'syz2'
}

// 具体实现
type MyPartial<T> = {
  [K in keyof T]?: T[K]
}


let extodo3: MyPartial<ExPartFoo> = {
  name: 'syz2'
}

// okay