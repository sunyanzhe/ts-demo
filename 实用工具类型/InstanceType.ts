class MyC {
  x = 0
  y = 0
}
type MyC2  = new () => {a: string, b: number}

let myc:MyC = new MyC()

type TypeC = typeof MyC

type InsTodo = InstanceType<typeof MyC> // MyC
type InsTodo2 = InstanceType<MyC2> // {a: string, b: number }


// 手写
type MyInstanceType<T> = T extends new (args: any[]) => infer P ? P : never

type MyInsTodo = MyInstanceType<typeof MyC> // MyC
type MyInsTodo2 = MyInstanceType<MyC2> // {a: string, b: number }