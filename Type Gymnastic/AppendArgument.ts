//For given function type Fn, and any type A (any in this context means we don't restrict the type, and I don't have in mind any type 😉)
//  create a generic type which will take Fn as the first argument, 
// A as the second, and will produce function type G which will be the same as Fn but with appended argument A as a last one.

/**

  type Fn = (a: number, b: string) => number
  type Result = AppendArgument<Fn, boolean> 
  expected be (a: number, b: string, x: boolean) => number 

*/


type AppendArgument<Fn extends Function, A> = (...args: [MyParameters<Fn>, A]) => MyReturn<Fn>
type MyParamters<Fn extends Function> = Fn extends (...args: infer R) => any ? R : never
type MyReturn<Fn extends Function> = Fn extends (...args: any[]) => infer R ? R : never

