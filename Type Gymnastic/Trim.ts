// https://github.com/type-challenges/type-challenges/blob/master/questions/108-medium-trim/README.md
/**
 * type trimed = Trim<'  Hello World  '> // expected to be 'Hello World'
 */

type WhiteSpace = '\t' | '\n' | ' '
type Trim<S extends string> = S extends `${WhiteSpace}${infer L}${WhiteSpace}`
  ? Trim<L>
  : S extends `${WhiteSpace}${infer L}`
    ? Trim<L>
    : S extends `${infer L}${WhiteSpace}`
      ? Trim<L>
      : S