interface aPerson {
  name: string;
  age: number
}

interface Memebr {
  key: string
}

type Readonly2<T> = {
  readonly [P in keyof T]: T[P]
}

type Partial2<T> = {
  [P in keyof T]?: T[P]
}

let obj1: Readonly2<aPerson & Memebr> = {
  name: '1',
  age: 123,
  key: '1'
}

obj1.key = '2' // error readonly 无法修改

type ReadonlyWithMember<T> = {
  [P in keyof T]: T[P]
} & Memebr

let obj2: ReadonlyWithMember<aPerson> = {
  name: '1',
  age: 123,
  key: '1'
}

obj2.key = '2' // ok 可以修改

type Proxy<T> = {
  get(): T
}
type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>
}

declare function proxify<T>(o: T): Proxify<T> 

function unproxify<T>(t: Proxify<T>): T {
  let obj = {} as T
  for (let key in t) {
    obj[key] = t[key].get()
  }
  return obj
}



// 有条件类型
declare function f<T extends boolean>(x: T): T extends true ? string : number

let x = f(Math.random() < 0.5);  // string | number

type TypeName<T> = 
  T extends string ? 'string' :
  T extends number ? 'number' :
  T extends boolean ? 'boolean' :
  T extends undefined ? 'undefined' :
  T extends Function ? 'function' :
  'object'

type T0 = TypeName<string>
type T1 = TypeName<'a'>
type T2 = TypeName<true>
type T3 = TypeName<() => void>
type T4 = TypeName<string[]>

interface Foo {
  propA: boolean
  propB: boolean
}

declare function f<T>(x: T): T extends Foo ? string : number

function foo<U>(x: U) {
  let a = f(x)

  let b: string | number = a
}

type BoxedValue<T> = {value: T}
type BoxedArray<T> = {value: T[]}

type Boxed<T> = T extends any[] ? BoxedValue<T[number]> : BoxedArray<T>


type T20 = Boxed<string>
type T21 = Boxed<any[]>
type T22 = Boxed<string | number[]>


type Diff<T, U> = T extends U ? never : T
type Filter<T, U> = T extends U ? T : never

type T30 = Diff<'a' | 'b' | 'c'|'d' , 'a'|'c'|'f'>
type T32 = Filter<'a' | 'b' | 'c' | 'd' , 'a'|'c'|'f'>

// type MM<T> = T extends 'b' ? never : T
type MM<T> = T extends 'b' ? T : never

type mm1 = MM<'a' | 'b'>

// 条件类型与映射类型结合使用
type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>

type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>
interface Part {
  id: number;
  name: string;
  subparts: Part[];
  updatePart(newName: string): void;
}

type T40 = FunctionPropertyNames<Part> // 'updatePart'
type T41 = NonFunctionPropertyNames<Part> // id | name | subparts
type T42 = FunctionProperties<Part> // { updateParte(newName: string: void) }
type T43 = NonFunctionProperties<Part> // { id: number, name: string, subparts: Part[] }

// infer 推断
interface User {
  name: string
  age: number
}
type ParamType<T> = T extends (...args: any[]) => infer P ? P : T

type Func = {
  (name: string):User
}

type T50 = ParamType<Func> // User
type T51 = ParamType<string> // string


type Bar<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never
type T60 = Bar<{a: (x: string) => void, b: (x: string) => void}> // string
type T61 = Bar<{a: (x: string) => void, b: (x: number) => void}> // never

type Foo1<T> = T extends {a: infer U, b: infer U} ? U : never
type T70 = Foo1<{a: string, b: string}> // string
type T71 = Foo1<{a: string, b: number}> // string | number


// 重载情况推断
declare function foo2(x: number | string): boolean | null
declare function foo2(x: string): number
declare function foo2(x: number): string

type T8 = ParamType<typeof foo2> // string 最后一个
type T81 = typeof foo2

type UnReadOnly<T> = {
  -readonly [K in keyof T]: T[K]
}

interface IAA  {
  readonly name: string
}

let iaa:UnReadOnly<IAA> = {
  name: '1'
}

iaa.name = '123'