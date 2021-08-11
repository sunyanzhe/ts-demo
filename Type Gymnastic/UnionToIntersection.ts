// https://github.com/type-challenges/type-challenges/blob/master/questions/55-hard-union-to-intersection/README.md

// example

// type I = Union2Intersection<'foo' | 42 | true> // expected to be 'foo' & 42 & true

type Union2Intersection<U> = (U extends any ? (args: U) => any : never) extends (args: infer R) => any ? R : never


type I = Union2Intersection<{'foo': string} | {'a': 1} | {'b': 2}>