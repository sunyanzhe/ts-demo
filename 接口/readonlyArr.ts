let a: Array<number> = [1,2,3,4];
let ro: ReadonlyArray<number> = a

a[1] = 3

/**
  Error!
  ro[3] = 19
  ro.push(5)
  ro.length = 100
  a = ro
**/

let b = ro as number[]