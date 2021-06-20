// 函数重载
declare function test(a: number): number
declare function test(a: string): string

const res5 = test('hello, world')
const resN = test(12345)

// 最佳实践
type TestType<T> = (a: T) => T

// 思考如下例子

interface User {
  name: string
  age: number
}

declare function test(para: User | number, flag?: boolean): number

/**
 * 本意是传入参数para是User时，不传flag
 * 传入para是number时，传入flag
 * 使用函数重载能够帮助我们实现
 */

declare function test(para: User): number
declare function test(para: number, flag: boolean): number

// 实际项目中，要多写几步，比如在class中

const _user: User = {
  name: 'jack',
  age: 123,
}

class SomeClas {
  public test(para: User): number
  public test(para: number, flag: boolean): number

  public test(para: User | number, flag?: boolean): number {
    return 11
  }
}

// ThisType

type ObjectDescriptor<D, M> = {
  data?: D,
  methods: M & ThisType<D & M>
}

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {}
  let methods: object = desc.methods || {}
  return { ...data, ...methods } as D & M
}

let objec = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx;
      this.y += dy;
    }
  }
})


// 自定义映射类型：想取出接口类型中的类型函数
type FunctionPropertyNames2<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

type FunctionProperties2<T> = Pick<T, FunctionPropertyNames2<T>>

interface Part2 {
  id: number
  name: string
  subparts: Part2[]
  updatePart(newName: string): void
}

type T440 = FunctionPropertyNames2<Part2>
type T442 = FunctionProperties2<Part2>


// 比如你可能为了方便，把本属于某个属性下的方法，通过一些方式alias到其他地方
// 举个例子： SomeClass下有个属性value = [1, 2, 3]，你可能在Decorators给类添加了此种功能：在SomeCass里调用this.find()时，实际上是调用this.value.find()，但是此时TypeScript并不知道这些
class SomeClass2 {
  value = [1,2,3];
  someMethod() {
    this.value.find(item => item === 1) // ok
    this.find()     // Error: SomeClass没有find方法
  }
}

// 借助于映射类型，和interface + class的声明方式，可以实现我们的目的

type ArrayMethodName = 'filter' | 'forEach' | 'find'
type SelectArrayMethod<T> = {
  [K in ArrayMethodName]: Array<T>[K]
}

interface SomeClass3 extends SelectArrayMethod<number> {}

class SomeClass3 {
  value = [1, 2, 3]
  someMethod() {
    this.forEach(item => item * 2)
    this.find(item => item * 2)
    this.filter(item => item * 2)
    this.value
    this.someMethod()
  }
}


// 类型断言
// 类型断言用来明确的告诉TS值的详细类型，合理使用能减少工作