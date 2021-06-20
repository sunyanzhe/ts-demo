interface Fetcher {
  getObject(done: (data: any, elapsedTime: number) => void): void
}

interface Fn1{
  (data: any): void
}

interface Fn2 {
  (data: any, time: number): void
}

let fetcher:Fetcher = {
  getObject(callback) {
    console.log(1)
  }
}
let fn1: Fn1 = (data) => {} 
let fn2: Fn2 = (data, time) => {}

fetcher.getObject(fn1)
fetcher.getObject(fn2)

type TTM<T extends any[]> = T extends [infer P, ...infer T] ? P : never
type ATM = TTM<[]>

type isNever<T> = T extends never ? true : false

type aaaamm = isNever<never>