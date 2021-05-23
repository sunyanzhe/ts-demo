type ReTodo = ReturnType<() => string> // string
type ReTodo2 = ReturnType<<T>() => T> // unknow

// 手写
type MyReturnType<T> = T extends (...args: any[]) => infer P ? P : never

type MyReTodo = MyReturnType<() => string> // string
type MyReTodo2 = MyReturnType<<T>() => T> // unknow
type MyReTodo3 = MyReturnType<() => any> // any
