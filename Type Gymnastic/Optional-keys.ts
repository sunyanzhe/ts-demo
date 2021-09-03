// https://github.com/type-challenges/type-challenges/blob/master/questions/90-hard-optional-keys/README.md

// Implement the advanced util type OptionalKeys<T>, which picks all the optional keys into a union.

// example 
// type case = OptionalKeys<{ a: number, b?: string }>  "b"

type OptionalKeys<T> = Exclude<keyof T, keyof RequiredKeys<T>>
type RequiredKeys<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K] 
}

