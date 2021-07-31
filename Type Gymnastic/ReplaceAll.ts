// Implement `ReplaceAll<S, From, To>` which replace the all the substring `From` with `To` in the given string `S`

/** Example
 * 
    type replaced = ReplaceAll<'t y p e s', ' ', ''> // expected to be 'types'
 */

type ReplaceAll<S extends string, From extends string, To extends string> = From extends '' 
  ? S
  : S extends `${infer A}${From}${infer B}`
    ? `${A}${To}${ReplaceAll<B, From, To>}`
    : S