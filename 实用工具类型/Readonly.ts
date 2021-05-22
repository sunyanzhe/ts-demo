interface ExReFoo {
  name: string
  age: number
}

let reTodo1: Readonly<ExReFoo> = {
  name: 'string',
  age: 123
}
// reTodo1.name = 'a' // error

let reTodo2 = {
  name: 'string',
  age: 123,
  job: 'IT'
}

reTodo1 = {
  name: 'aaa',
  age: 312
}

reTodo1 = reTodo2

type myReadOnly<T> = {
  readonly [K in keyof T]: T[K]
}

let reTodo3: Readonly<ExReFoo> = {
  name: 'string',
  age: 123
}

// reTodo3.name = 'a' // error
