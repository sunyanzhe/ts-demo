function f(x: number, y?: number) {
  return x + (y ?? 0)
}


f(1, 2)
f(1)
f(1, undefined)
f(1, null) // error

let asds = 'string'
asds = null // error


class CC {
  a: number;
  b?: number;
}

let cc = new CC()
cc.a = 12
cc.a = undefined // error, undefined is not assignable to number

cc.b = 13
cc.b = undefined
cc.b = null // error



// 类型守卫和类型断言

function ff1(sn: string | null): string {
  if (sn == null) {
    return 'default'
  }
  return sn
}

function ff2(sn: string | null): string {
  return sn || 'default'
}

function broken(name: string | null): string {
  function postfix(epithet: string) {
    return name.charAt(0) + '. the ' + epithet; // error name可能为null
  }
  name = name || 'bob'
  return postfix('great');
}

function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + '. the ' + epithet;
  }
  name = name || 'Bob'
  return postfix('great')
}

// !. 的意思就是name肯定有值