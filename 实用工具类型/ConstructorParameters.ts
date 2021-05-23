interface ExConsTodo {
  new (age: string, name: string): any
}

type Te0 = ConstructorParameters<ExConsTodo> // [age: string, name: string]

// 手写实现
type MyConstructorParameters<T> = T extends new (...args: infer P) => any ? P : never


type MyTe0 = ConstructorParameters<ExConsTodo> // [age: string, name: string]
