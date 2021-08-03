// https://github.com/type-challenges/type-challenges/blob/master/questions/527-medium-append-to-object/README.md

// Implement a type that adds a new field to the interface. The type takes the three arguments. The output should be an object with the new field

/**
 * type Test = { id: '1' }
 * type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }
 */

type FlatObj<T> = {[K in keyof T]: T[K]}

type AppendToObject<T, U extends PropertyKey, V> = FlatObj<{[K in keyof T]: T[K]} & {[K in U]: V}>
