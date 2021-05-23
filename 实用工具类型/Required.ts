interface ReqTodo {
  a?: number;
  b?: string;
}

const reqtodo1: Required<ReqTodo> = { a: 10, b: '123' }

// 手写
type MyRequired<T> = {
  [k in keyof T] -?: T[k]
}

const myreqtodo1: MyRequired<ReqTodo> = { a: 10, b: '123' }
