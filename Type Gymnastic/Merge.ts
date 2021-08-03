// https://github.com/type-challenges/type-challenges/blob/master/questions/599-medium-merge/README.md

// Merge two types into a new type. Keys of the second type overrides keys of the first type.

type Merge<F, S> = {
  [K in keyof S | keyof F]: 
    K extends keyof S 
      ? S[K]
      : K extends keyof F
        ? F[K]
        : never
}

type Ma = {
  type: 'a',
  b: string
}

type Mb = {
  b: number
}

type TestMerge = Merge<Ma, Mb>