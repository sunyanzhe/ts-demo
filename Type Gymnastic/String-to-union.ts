// https://github.com/type-challenges/type-challenges/blob/master/questions/531-medium-string-to-union/README.md

// Implement the String to Union type. Type take string argument. The output should be a union of input letters

/**
 * type Test = '123';
 * type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"
 */

type StringToUnion<T extends string> = StringToTuple<T>[number]

type StringToTuple<T extends string, P extends any[] = []> = T extends `${infer A}${infer B}`
  ? StringToTuple<B, [...P, A]>
  : P

type TestStringToUnion = StringToUnion<'123'>