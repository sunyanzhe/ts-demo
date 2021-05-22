interface ExOmTodo {
  title: string;
  description: string;
  completed: boolean;
}

type ExTodoPreview = Omit<ExOmTodo, 'description'>

const exomtodo:ExTodoPreview = {
  title: 'a',
  completed: true
}


// 手写实现

type MyOmit<T, K extends keyof any> = {
  [k in MyDiff<keyof T, K>]: T[k]
}
type MyDiff<T, E> = T extends E ? never : T