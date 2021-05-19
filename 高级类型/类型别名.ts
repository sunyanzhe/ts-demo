type Name1 = string;
type NameResolver = () => string;
type NameOrResolve = Name1 | NameResolver

function getName(n: NameOrResolve): Name1 {
  if (typeof n === 'string') {
    return n;
  } else {
    return n();
  }
}

type Container<T> = { value: T }

type Tree<T> = {
  value: T;
  left: Tree<T>;
  right: Tree<T>
}

type LinkedList<T> = T & {next: LinkedList<T> | null}
interface Person1 {
  name: string;
}

var people: LinkedList<Person1> = {
  name: 'a',
  next: {
    name: 'a',
    next: {
      name: 'a',
      next: null
    }
  }
} 

var s = people.name
s = people.next!.name
s = people.next!.next!.name


type LinkList<T> = {
  value: T
  next?: LinkList<T>
}

let link: LinkList<number> = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: undefined
    }
  }
}


interface Square {
  kind: 'square'
  size: number
}

interface Rectangle {
  kind: 'rectangle';
  height: number
  width: number
}

interface Circle {
  kind: 'circle'
  radius: number
}

interface Tirangle {
  kind: 'tirangle'
  height: number;
  bottom: number;
}

type Shapes = Square | Rectangle | Circle | Tirangle
function area(s: Shapes) {
  switch (s.kind) {
    case 'square':
      return s.size ** 2
    case 'rectangle':
      return s.height * s.width      
    case 'circle':
      return Math.PI * s.radius ** 2
  }
  // 这里应该报错因为Triangle的情况没有写完
}

// 校验完整性
// planA 指定返回类型
function area1(s: Shapes): number {
  switch (s.kind) {
    case 'square':
      return s.size ** 2
    case 'rectangle':
      return s.height * s.width      
    case 'circle':
      return Math.PI * s.radius ** 2
  }
}

// planB 使用never类型
function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x);
}
function area2(s: Shapes) {
  switch (s.kind) {
    case "square": return s.size * s.size;
    case "rectangle": return s.height * s.width;
    case "circle": return Math.PI * s.radius ** 2;
    // case "tirangle": return s.height * s.bottom / 2;
    default: return assertNever(s) // s并不是never还有triangle
  }
}