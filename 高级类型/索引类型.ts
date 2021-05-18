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