type Replace<S extends string, From extends string, To extends string> = S extends `${infer H}${From}${infer E}` 
  ? From extends '' 
    ? S
    : `${H}${To}${E}` 
  : S

type al = Replace<'asd', 's', 't'>
type b = 'From'
type x = al extends `${infer A}${b}${infer B}` ? true : false