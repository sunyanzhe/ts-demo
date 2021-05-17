import { Fish, Bird, default as getSmallPet }  from './getSmallPet'

let pet = getSmallPet()

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

// 在调用了isFish之后，TS会将pet的类型从Fish｜Bird，缩减到Fish，并在整个条件语句中，一直有效

if (isFish(pet)) {
  pet.swim()
} else {
  pet.fly()
}


/**
 * ------------------ 分割线 --------------------
 * 另一个例子
 */

// 只返回boolean

function checkString(a: any): boolean {
  return typeof a === 'string'
}

//  类型谓词
function isString(a: any): a is string {
  return typeof a === 'string'
}


function log(a: any): void {
  if (checkString(a)) {
    console.log(a)
    console.log(a.length)
    console.log(a.toExponential(2)); // 编译不报错 运行报错
  }
}

function log2(a: any): void {
  if (isString(a)) {
    console.log(a)
    console.log(a.length)
    console.log(a.toExponential(2)) // 编译报错 这里编译报错是因为 类型谓词将a的类型收窄为string了 string没有toExponential方法
  }
    console.log(a.toExponential(2)) // 编译不报错 运行报错
}