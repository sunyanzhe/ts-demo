const actions = ["CREATE", "READ", "UPDATE", "DELETE"] as const

function execute(action: string) {
  if (actions.includes(action)) {

  }
}

function includes<T extends U, U>(arrs: ReadonlyArray<T>, action: U): action is T {
  return arrs.includes(action as T)
}

type Trim<T extends string> = T extends `${infer A}${infer B}` 
  ? B extends ''
    ? A
    : B
  : never

type t1 = Trim<'abb'>

type ttt1 = 'a' | 'b' | 'c'
type ttt2 = 'a' | 'c' | 'd'

type MyEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false
type Includes<T extends any[], U> = true extends {
  [K in keyof T]: MyEqual<T[K], U>
}[number] ? true : false