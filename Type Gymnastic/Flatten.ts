// https://github.com/type-challenges/type-challenges/blob/master/questions/459-medium-flatten/README.md

// In this challenge, you would need to write a type that takes an array and emitted the flatten array type.

// type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]

type Flatten<T extends any[]> = 
  T['length'] extends 0
    ? []
    : T extends [infer A, ...infer B]
      ? A extends any[] ? [...Flatten<A>, ...Flatten<B>] : [A, ...Flatten<B>]
      : T