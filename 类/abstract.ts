abstract class A1 {
  constructor(public name:string) {}
  abstract methodA(): void
  methodB():void {
    console.log('methodB')
  }
}

class B1 extends A1 {
  constructor(name: string, public anotherName: string) {
    super(name)
  }
  methodA(): void {
    console.log('methodA')
  }
  methodC() {
    console.log('methodC')
  }
}
class C1 extends B1 {
  constructor() {
    super('', '')
  }
  methodD() {
    console.log('methodD')
  }
}

let b1: A1 = new B1('b', 'b')
b1.methodA()
b1.methodB()
b1.methodC() // 错误: 方法在声明的抽象类中不存在