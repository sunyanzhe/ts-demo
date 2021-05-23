declare function f1(arg: {a: number, b: string}): void;

type T01 = Parameters<() => string>  // []

type T02 = Parameters<(s: string) => void> // [s: string]

type T03 = Parameters<<T>(arg: T) => T> // [arg: unknow]

type T04 = Parameters<typeof f1> // [arg: {number, string}]

type T05 = Parameters<any> // unknow[]

type T06 = Parameters<never> // never

// type T07 = Parameters<string>  // error

// type T08 = Parameters<Function> // error



// 手写
type MyParameters<T> = T extends (args: infer K) => any ? K : never



