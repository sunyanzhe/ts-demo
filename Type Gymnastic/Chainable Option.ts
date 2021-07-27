// https://github.com/type-challenges/type-challenges/blob/master/questions/12-medium-chainable-options/README.md
/**
 * declare const config: Chainable

  const result = config
    .option('foo', 123)
    .option('name', 'type-challenges')
    .option('bar', { value: 'Hello World' })
    .get()

  // expect the type of result to be:
  interface Result {
    foo: number
    name: string
    bar: {
      value: string
    }
}
 */

type Chainable<T extends {} = {}> = {
  option<K extends string | number | symbol, V>(key: K, value: V): Chainable<T & {[L in K]: V}>
  get(): T
}