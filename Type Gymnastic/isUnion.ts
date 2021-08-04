// https://github.com/type-challenges/type-challenges/blob/master/questions/1097-medium-isunion/README.md

// Implement a type IsUnion, which takes an input type T and returns whether T resolves to a union type.

// example

/**
 * type case1 = IsUnion<string>  // false
 * type case2 = IsUnion<string|number>  // true
 * type case3 = IsUnion<[string|number]>  // false
 * type case4 = IsUnion<never>   // false
 */

type IsUnion<T, B = T> = [T] extends [never]
  ? false
  : T extends any
    ? Exclude<B, T> extends never
      ? false 
      : true
    : never

type IsUnionCase1 = IsUnion<string>  // false
type IsUnionCase2 = IsUnion<string|number>  // true
type IsUnionCase3 = IsUnion<[string|number]>  // false
type IsUnionCase4 = IsUnion<never>   // false
