let myAdd: (x: number, y: number) => number
myAdd = function(x: number, y: number):number {
  return x + y
}

interface Add{
  (x: number, y: number): number
}

let myAdd2: Add = function(a, b) {
  return a + b
}