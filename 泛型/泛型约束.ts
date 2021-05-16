class Num<T> {
  zeroValue: T;
  add: (x:T, y:T) => T
}

let num = new Num<number>()
num.zeroValue = 0
num.add = function(x, y) {return x + y}

let num2 = new Num<string>()
num2.zeroValue = ''
num2.add = function(x, y) {return x + y}

function getProperty<T, K extends keyof T>(obj: T, name: K) {
  return obj[name]
}

let obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
}

getProperty(obj, 'a')
// getProperty(obj, 'm') // error!

function create<T>(c: new() => T): T {
  return new c()
}

class Foo {
  fullName: string
}

let foo1 = create(Foo)


class BeeKeeper {
  hasMask: Boolean
}

class ZooKeeper {
  nametag: string
}

class Animal {
  numLegs: number
}

class Bee extends Animal {
  keeper: BeeKeeper;
}

class Lion extends Animal {
  keeper: ZooKeeper
}

function createInstance<A extends Animal>(c: {new(): A}): A {
  return new c()
}

createInstance(Animal)
createInstance(Lion).keeper.nametag = 'aaa' // ok