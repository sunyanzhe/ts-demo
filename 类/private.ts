class A {
  protected name: string;
  constructor(name) {
    this.name = name;
  }
  public log() {
    console.log(this.name)
  }
}

class B extends A {
  public v: string;
  constructor() {
    super('this is B Instance')
    this.v = 'a'
    this.name = 'aaa'
  }
}

class C {
  private name: string;
  constructor(name) {
    this.name = name;
  }
}

let a = new A('this is A Instance')
let b = new B()
let c = new C('this is C Instance')

a.log()
a = b

// a = c // 报错： A 与 C不兼容
