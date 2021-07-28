// https://github.com/type-challenges/type-challenges/blob/master/questions/106-medium-trimleft/README.md
/**
 * type trimed = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '
 */

type WhiteSpace = ' ' | '\t' | '\n'
type TrimLeft<S extends string> = S extends `${WhiteSpace}${infer L}` ? TrimLeft<L> : S

