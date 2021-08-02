// https://github.com/type-challenges/type-challenges/blob/master/questions/298-medium-length-of-string/README.md

// Compute the length of a string literal, which behaves like String#length.

type LengthOfString<S extends string, T extends any[] = []> = S extends ''
  ? T['length']
  : S extends `${infer A}${infer B}`
    ? LengthOfString<B, [...T, A]>
    : never