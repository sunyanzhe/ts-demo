// The get function in lodash is a quite convenient helper for accessing nested values in JavaScript. 
// However, when we come to TypeScript, using functions like this will make you lose the type information.
// With TS 4.1's upcoming Template Literal Types feature, properly typing get becomes possible. 
// Can you implement it?

// https://github.com/type-challenges/type-challenges/blob/master/questions/270-hard-typed-get/README.md

type Get<T, K> = K extends `${infer A}.${infer B}`
  ? A extends keyof T
    ? Get<T[A], B>
    : never
  : K extends keyof T
    ? T[K]
    : never
  
type GetTypeData = {
  foo: {
    bar: {
      value: 'foobar',
      count: 6,
    },
    included: true,
  },
  hello: 'world'
}

type GetTest1 = Get<GetTypeData, 'hello'>
type GetTest2 = Get<GetTypeData, 'foo.bar.count'>
type GetTest3 = Get<GetTypeData, 'foo.bar'>