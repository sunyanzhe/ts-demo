interface GenericIdentityFn {
  <T>(arg: T): T;
}

function identity<T>(arg: T): T {
  return arg
}

let myIdentity: GenericIdentityFn = identity


interface IDFn<T> {
  (arg: T): T;
}

let id: IDFn<string> = identity
let id2: IDFn<number> = identity

id('a')
id2(123)
myIdentity(100)