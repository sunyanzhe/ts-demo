type ExExcTodo = Exclude<'a' | 'b' | 'c' , 'c'> // 'a' | 'b'
type ExExcTodo2 = Exclude<'a', 'a'>  //never


// 手写

type MyExclude<T, E> = T extends E ? never : T

type ExEcTodo3 = MyExclude<'a' | 'b', 'a' | 'b'> // never

