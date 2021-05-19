// js version
function pluck(o, propertyNames) {
  return propertyNames.map(n => o[n])
}

// ts version

function pluckTs<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
  return propertyNames.map(n => o[n])
}


interface Car {
  manufacturer: string;
  model: string;
  year: number;
}

let taxi: Car = {
  manufacturer: 'Toyota',
  model: 'Camry',
  year: 2014
}

let carProps: keyof Car = 'model'

pluckTs(taxi, ['year', 'unknown']) // error

function getProperty<T, K extends keyof T>(o: T, prop: K): T[K] {
  return o[prop]
}

let n: string = getProperty(taxi, 'model')
let y: number = getProperty(taxi, 'year')
let unknown = getProperty(taxi, 'unknown') //error

interface Dictionary<T> {
  [key: string]: T
}
let keys: keyof Dictionary<number>; // string | number
let value: Dictionary<number>['foo']; // number

keys = 1
keys = 'a'


interface Dictionary2<T> {
  [key: number]: T
}

let keys2: keyof Dictionary2<number>;
let value2: Dictionary2<number>['foo'] //error
let value3: Dictionary2<number>[2] // okay

keys2 = 'a' // error

keys2 = 1 // ok