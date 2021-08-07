// https://github.com/type-challenges/type-challenges/blob/master/questions/2070-medium-drop-char/README.md

// Drop a specified char from a string.

// example

// type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'

type DropChar<S, C extends string> = S extends `${infer A}${C}${infer B}` ? DropChar<`${A}${B}`, C>: S


// case
type DropCharCase = DropChar<' b u t t e r f l y ! ', ' '>