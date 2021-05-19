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

