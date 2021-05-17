

















































## 联合类型
一个代码库希望传入`number`或`string`类型的参数
```ts
/**
 * Takes a string and adds 'padding' to the left
 * If 'padding' is a string, then 'padding' is addpended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: any) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(" ") + value
  }
  if (typeof padding === 'string') {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

padLeft('Hello World', 4)
```

`padLeft`存在一个问题，padding的参数类型指定成了any。这就是说我们可以传入一个既不是number也不是string类型的参数，但是TS却不报错

```ts
let indentedString = padLeft('Hello World', true); // 编译不报错，运行时报错
```
在传统的面向对象语言里，我们可能会讲这两种类型抽象成有层级的类型。这么做显然是非常清晰的，但同时也存在了过度设计。`padleft`原始版本的好处之一是允许我们传入原始类型。这样做的话使用起来既简单有方便。如果我们就是想使用已经存在的函数的话，这种新的方式就不适用了。

代替any，我们可以使用联合类型作为padding的参数

```ts
function padLeft(value: string, padding: string | number) {
  // ...
}

let indentedString = padLeft('hello world', true); // errors during compilation
```


联合类型表示一个值可以是几种类型之一，我们用竖线｜分割每个类型，所以`number | string | boolean`表示一个值可以是`number` `string`或`boolean`.
如果一个值可以是联合类型，我们只能访问此联合类型所有类型里共有的成员

```ts
interface Bird {
  fly(meter: number);
  layEggs(): number;
}

interface Fish {
  swim();
  layEggs();
}

function getSmallPet(): Fish | Bird {
  // ...
}
let pet  = getSmallPet()
pet.layEggs(); // okay
pet.swim(); // errors
```

这里的联合类型可能有点复杂，但是你很容易就习惯了。如果一个值的类型是`A | B`，我们能够确定得失它包含了A和B中共有的成员。这个例子里，Bird具有一个fly成员。我们不能确定一个Bird ｜ Fish类型的变量是否有fly方法。如果变量在运行时是Fish类型，那么调用pet.fly()就会出错了。


## 类型守卫与类型区分
联合类型适用于那些值可以为不同类型的情况。但当我们想确切地了解是否为Fish时怎么办？Javascript里常用来区分2个可能值的方法是检查成员是否存在。如之前提及的，我们只能访问联合类型中共同拥有的成员

```ts
let pet = getSamllPet();
if (pet.swim) {
  pet.swim()
} else if (pet.fly) {
  pet.fly()
}
```

为了让这段代码工作，我们要使用类型断言：

```ts
let pet = getSamllPet();

if ((pet as Fish).swim) {
  (pet as Fish).swim();
} else if ((pet as Bird).fly) {
  (pet as Bird).fly();
}
```

### 用户自定义的类型守卫
这里可以注意到我们不得不多次使用类型断言。假若我们一旦检查过类型，就能在之后的每个分支里清楚地知道pet的类型的话就好了

TypeScript里的类型守卫机制让它成为了现实。类型守卫就是一些表达式，他们会在运行时检查以确保在某个作用域里的类型。

#### 使用类型判定
要定义一个类型守卫，我们只要简单地定义一个函数，它的返回值是一个类型谓词：
```ts
function isFish(pet: Fish | Bird): pet is Fish  {
  return (pet as Fish).swim !== undefined;
}
```
在这个例子里，`pet is Fish`就是类型谓词。谓词为`parameterName is Type`这种形式，`parameterName`必须是来自于当前函数签名里的一个参数名

每当使用一些变量调用isFish时，TS会讲变量缩减为那个具体的类型，只要这个类型与变量的原始类型是兼容的

```ts
if (isFish(pet)) {
  pet.swim()
} else {
  pet.fly()
}
```

注意TS不仅知道if分支里pet是Fish类型；他还清楚else分支里，一定不是Fish类型，一定是Bird类型。

#### 使用 in 操作符
`in`操作符可以作为类型细化表达式来使用

对于`n in x`表达式，其中`n`是字符串子棉量或字符串字面量类型且`x`是个联合类型，那么`true`分支的类型细化为一个可选的或必须的属性`n`, false分支的类型细化为有一个可选的或不存在属性`n`

```ts
function move(pet: Fish | Bird) {
  if ('swim' in pet) {
    return pet.swim()
  }
  return pet.fly()
}
```


#### typeof 类型守卫
现在我们回过头来看看怎么使用联合类型书写`padLeft`代码。我们可以像下面这样利用类型断言来写：
```ts
function isNumber(x: any): x is number {
  return typeof x === 'number'
}

function isString(x: any): x is string {
  return typeof x === 'string'
}

function padLeft(value: string, padding: string | number) {
  if (isNumber(padding)) {
    return Array(padding + 1).join(" ") + value
  }
  if (isString(padding)) {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'. `)
}
```

然而，必须要定义一个函数来判断类型是否是原始类型，这太痛苦了。幸运的是，现在我们不必将`typeof x === 'number'`抽象成一个函数，因为Ts可以将它是别为一个类型首位，也就是说我们可以直接在代码里检查类型了。

```ts
function padLeft(value: string, padding: string | number) {
  if (typeof padding === 'number') {
    return padding.length
  }
}
```


###  instanceof 类型守卫
instanceof 类型守卫是通过构造函数来细化类型的一种方式，比如，我们借鉴一下之前字符串填充的例子：

```ts
interface Padder {
  getPaddingString(): string
}

class SpacerepeatingPadder implements Padder {
  constructor(private numSpaces: number) { }
  getPaddingString() {
    return Array(this.numSpaces + 1).join(' ')
  }
}

class StringPadder implements Padder {
    constructor(private value: string) { }
    getPaddingString() {
        return this.value;
    }
}

function getRandomPadder() {
    return Math.random() < 0.5 ?
        new SpaceRepeatingPadder(4) :
        new StringPadder("  ");
}

// 类型为SpaceRepeatingPadder ｜ StringPadder
let padder: Padder = getRandomPadder()

if (padder instanceof SpaceRepeatingPadder) {
  padder; // 类型细化为 SpaceRepeatingPadder
}
if (padder instanceof StringPadder) {
  padder; // 类型细化为 StringPadder
}
```

instanceof 的右侧要求是一个构造函数，TS将细化为：
1. 此构造函数的prototype属性的类型，如果他的类型不为any的话
2. 构造签名所返回的类型的联合



## 可以为nll的类型
null和undefined，在默认情况下是所有其他类型的一个有效值。
`--stricNullChecks`标记可以解决此类错误：当你声明一个变量时，他不会自动地包含null或undefined。你可以使用联合类型明确包含他们

```ts
let s = 'foo'
s = null // 错误， null不能赋值string
let sn: string | null = 'bar'
sn = null // okay

sn = undefined; // error， undefined不能复制给`string | null`

```

注意，按照JS的语义，TS会把null和undefined区别对待。`string | null`, `string | undefined`和`string | undefined | null`是不同的类型

## 可选参数和可选属性

使用了`--strictNullChecks`，可选参数会被自动地加上`| undefined`：

```ts
function f(x: number, y?: number) {
  return x + (y ?? 0)
}
f(1, 2)
f(1)
f(1, undefined)
f(1, null) // error
```

可选属性也会有同样的处理：

```ts
class C {
  a: number;
  b?: number;
}

let c = new C()
c.a = 12
c.a = undefined; //error
c.b = 13
c.b = undefined; // ok
c.b = null // error
```

### 类型守卫和类型断言

由于可以为null的类型是通过联合类型实现，那么你需要使用类型守卫来去除null。幸运地是这与在JS里的代码一致：

```ts
function f(sn: string | null): string {
  
}
```