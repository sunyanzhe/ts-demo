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
