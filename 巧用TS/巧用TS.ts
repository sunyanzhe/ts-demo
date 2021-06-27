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

// 实现简单的 Vue Type
type Options<T> = {
  [P in keyof T] : T[P]
}

declare function test<T>(o: Options<T>): T

test({ name: 'hello' }).name    // string

// data
declare function test2<T>(o: {data: Options<T>}): T

test2({data: {name: 'hello'}}).name   // string


// computed
type Computed<T> = {
  [P in keyof T]: () => T[P]
}

interface Params<T, M> {
  data: Options<T>,
  computed: Computed<M>
}

declare function test3<T, M>(o: Params<T, M>): T & M

const param = {
  data: {
    name: 'Hello'
  },
  computed: {
    age() {
      return 10
    }
  }
}
let result = test3(param)

// ThisType
declare function test4<T, M>(o: Params<T, M> & ThisType<T & M>) : T & M
const param2 = {
  data: {
    name: 'Hello'
  },
  computed: {
    age() {
      this.name   // string
      return 10
    }
  }
}
let result2 = test4(param2)


// --------------- 扁平数组构建树形结构 ---------------
// 转换前数据
const BeforeTransArr = [
 { id: 1, parentId: 0, name: 'test1' },
 { id: 2, parentId: 1, name: 'test2' },
 { id: 3, parentId: 0, name: 'test3' }
]

// 转换后
const AfterTransArr = [
  {
    id: 1,
    parentId: 0,
    name: 'test1',
    children: [
      {id: 2, parentId: 1, name: 'test2', children: []}
    ]
  },
  {
    id: 3,
    parentId: 0,
    name: 'test3',
    children: []
  }
]

// 如果children字段名字不变，函数的类型并不难写，大概就是这个样子

interface Item {
  id: number
  parentId: number
  name: string
}

type TreeItem = Item & { children: TreeItem[] | [] }

declare function listToTree(list: Item[], options: {childrenKey: string}): TreeItem[]


// 但是很多时候，children字段的名字并不固定，而是从参数中传进来的

const options = {
  childrenKey: 'children'
}

listToTree(BeforeTransArr, options)

// 这时候泛型就要登场了！

type Item2 = {
  id: number
  parentId: number
  name: string
}

type Options2<T extends string> = {
  childrenKey: T
}

type TreeItem2<T extends string> = Item2 & {
  [key in T]: TreeItem2<T>[] | []
}

declare function listToTree2<T extends string = 'children'>(list: Item2[], opt?: Options2<T>): TreeItem2<T>[]


let tree2 = listToTree2(BeforeTransArr, {childrenKey: 'childrenList'}).map(item => item.childrenList) // ok

// 局限由于，对象字面量的受Fresh的影响，当options不是对象字面量的时候，需要断言
let options3 = {
  childrenKey: 'childrenList'
}

let tree3 = listToTree2(BeforeTransArr, options3).map(item => item.children) // 没断言，且不是字面量，没有Fresh

let options4 = {
  childrenKey: 'childrenList' as 'childrenList'
}

let tree4 = listToTree2(BeforeTransArr, options4).map(item => item.childrenList) // 有断言，会报错