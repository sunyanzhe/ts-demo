type ExExtTodo1 = Extract<'a' | 'b' | 'c', 'a' | 'f'> // 'a'
type ExExtTodo2 = Extract<string | number | (() => void), Function>; // () => void
type ExExtTodo3 = Extract<'a' | 'b' | 'c',  'f'> // never


// 手写
type MyExtract<T, U> = T extends U ? T : never