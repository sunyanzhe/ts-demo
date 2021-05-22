# 实用工具类型
## 目录
* `Partial<T>`
* `Readonly<Type>`
* `Record<Keys, Type>`
* `Pick<Type, Keys>`
* `Omit<Type, Keys>`
* `Exclude<Type, ExcludedUnion>`
* `Extract<Type, Union>`
* `NonNullable<Type>`
* `Parameters<Type>`
* `ConstructorParameters<Type>`
* `ReturnType<Type>`
* `InstanceType<Type>`
* `Required<Type>`
* `ThisParameterType<Type>`
* `OmitThisParameter<Type>`
* `ThisType<Type>`

## Partial<Type>
构造类型Type，并将它所有的属性设置为可选的。它的返回类型表示输入类型的所有子类型

### 例子
```ts
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return {...todo, ...fieldsToUpdate}
}

const todo1 = {
  title: 'organize desk',
  description: 'clear clutter'
}

const todo2 = updateTodo(todo1, {
  description: 'throw out trash'
})
```

## Readonly<Type>
构造类型Type，并将它所有的属性设置为`readonly`，也就是说构造出的类型的属性不能被再次赋值。

### 例子
```ts
interface Todo {
  title: string;
}
const todo: Readonly<Todo> = {
  title: 'Delete inactive users'
}
todo.title = 'Hello'; // Error: cannot reassign a readonly property

```
这个工具可用来表示在运行时会失败的赋值表达式（比如，当尝试给冻结对象的属性再次赋值时）

#### Object.freeze
```ts
function freeze<T>(obj: T): Readonly<T>;
```


## Record<Keys, Type>
构造一个类型，其属性名的类型为`K`，属性值的类型为`T`。这个工具可用来将某个类型的属性映射到另一个类型上。

### 例子
```ts
interface PageInfo {
  title: string
}

type Page = 'home' | 'about' | 'contact'

const x: Record<Page, PageInfo> = {
  about: { title: 'about' },
  contact: { title: 'contact' },
  home: { title: 'home' }
}
```


## Pick<Type, Keys>
从类型`Type`中挑选部分属性`Keys`来构造类型

### 例子
```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false
}
```

## Omit<Type, Keys>
从类型Type中获取所有属性，然后从中剔除Keys属性后构造一个类型。

### 例子
```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreciew = Omit<Todo, 'description'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
}
```

## Exclude<Type, ExcludedUnion>
从类型`Type`中剔除所有可以赋值给`ExcludedUnion`的属性，然后构造一个类型

### 例子
```ts
type T0 = Exclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'
type T1 = Exclude<string | nuber | (() => void), Function>; // string | number
```

## Extract<Type, Union>
从类型`Type`中国呢提取所有可以复制给`Union`的类型，然后构造一个类型

### 例子
```ts
type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'>; // 'a'
type T1 = Extract<string | number | (() => void), Function>; // () => void
```

## NonNullable<Type>
从类型`Type`中剔除`null`和`undefined`，然后构造一个类型

### 例子
```ts
type T0 = NonNullable<string | number | undefined>; // string | number
type T2 = NonNullable<string[] | null | undefined>; // string[]
```


## Parameters<Type>
由函数类型`Type`的参数类型来构建出一个元组类型

### 例子
```ts
declare function f1(arg: { a: number, b: string }): void

type T0 = Parameters<() => string>
// []

type T1 = Parameters<(s: string) => void>
// [s: string]

type T2 = Parameters<<T>(arg: T) => T>;
// [arg: unknow]

type T3 = Parameters<typeof f1>
// [arg: {a: number, b: string}]

type T4 = Parameters<any>
// unknow[]

type T5 = Parameters<never>
// never

type T6 = Parameters<string>
// never
// Type 'string' dose not satisfy the constraint '(...args: any) => any'

type T7 = Parameters<Function>
// never
// Type 'Function' dose not satisfy the constraint '(...args: any) => any'
```

## ConstructorParameters<Type>
由构造函数类型来构建出一个元组类型或数组类型。由构造函数类型`Type`的参数类型来构建出一个元组类型。（若`Type`不是构造函数类型，则返回`never`）。
