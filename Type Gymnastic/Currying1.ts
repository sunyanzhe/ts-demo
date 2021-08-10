// https://github.com/type-challenges/type-challenges/blob/master/questions/17-hard-currying-1/README.md

// Currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each take a single argument.

/** example
 * const add = (a: number, b: number) => a + b
   const three = add(1, 2)

   const curriedAdd = Currying(add)
   const five = curriedAdd(2)(3)
 */

declare function Curry<Fn>(fn: Fn): Currying<Fn>

type Currying<Fn> = Fn extends (...args: infer Args) => infer R
  ? Args extends [infer A, ...infer B] 
    ? (arg: A) => Currying<(...args: B) => R>
    : R
  : never