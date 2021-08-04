// https://github.com/type-challenges/type-challenges/blob/master/questions/645-medium-diff/README.md

// Get an Object that is the difference between O & O1

/**
 * type Foo = {
 *   name: string
 *   age: string
 * }
 * type Bar = {
 *   name: string
 *   age: string
 *   gender: number
 * }
 * 
 * <Diff<Foo, Bar> => { gender: number }
 */

type MyDiff2<A, B> = {
  [K in (Exclude<keyof A, keyof B> | Exclude<keyof B, keyof A>)]: K extends keyof A
    ? A[K]
    : K extends keyof B
      ? B[K]
      : never
}

type DiffFoo = {
  name: string
  age: string
}
type DiffBar = {
  name: string
  age: string
  gender: number
}

type DiffExample = MyDiff2<DiffFoo, DiffBar>