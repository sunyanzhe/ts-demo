# 高级类型
## 交叉类型（intersection Types）

交叉类型是将多个类型合并为一个类型。这让我们可以把现有的多种类型叠加到一起成为一个类型，它包含了所需的所有类型的特性。例如，`Person & Serializable & Loggable`同时时`Person`和`Seralizable`和`Loggable`。就是说这个类型的对象同时拥有了三种类型的成员。

我们大多是混入(mixins)或其他不适合典型面形对象模型的地方看到交叉类型的使用。（在Javascript里发生这种情况的场合很多！）下面是如何创建混入的一个简单例子（'target': 'es5'）

```ts
function extend<First, Second>(first: First, second: Second): First & Second {
  const result: A<First & Second> = {};
  for (const prop in first) {
    if (first.hasOwnProperty(prop)) {
      (result as First)[prop] = first[prop]
    }
  }
  for (const prop in second) {
    if (second.hasOwnProperty(prop)) {
      (result as Second)[prop] = second[prop]
    }
  }
  return result as First & Second;
}

```
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
  if (sn == null) {
    return 'default'
  } else {
    return sn;
  }
}
```

也可使用短路操作符

```ts
function f(sn: string | null): string {
  return sn || 'default'
}
```


如果编译器不能去除`null`或`undefined`，你可以使用类型断言手动去除。语法是添加`!`后缀： `identifier!`从`identifier`的类型里去除了`null`和`undefined`:

```ts
function broken(name: string | null): string {
  function postfix(epithet: string) {
    return name.charAt(0) + '. the ' + epithet; // error, name is possibly null
  }
  name = name || 'Bob'
  return postfix('great')
}

function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.chartAt(0) + '. the ' + epithet; // okay
  }
  name = name || 'bob'
  return postfix('great')
}
```

使用了嵌套函数，因为编译器无法去除嵌套函数的null（除非是立即执行函数表达式）。因为它无法跟踪所有对嵌套函数的调用，尤其是你将内层函数作为外层函数的返回值。如果无法知道函数在哪里被调用，就无法知道调用时name的类型。

## 类型别名
类型别名会给一个类型起个新名字。类型别名有时和接口很像，但是可以作用域原始值，联合类型，元组以及其他任何你需要手写的类型。

```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver

function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n
  } else {
    return n()
  }
}
```

起别名并不会建立新的类型，他只是创建了一个新名字来引用那个类型。给原始类型起别名通常没什么用，尽管可以做为文档的一种形式使用。
同接口一样，类型别名也可以是泛型 - 我们可以添加类型参数并且在别名生命右侧传入：

```ts
type Container<T> = {value: T}
```

我们也可以使用类型别名来在属性里引用自己

```ts
type Tree<T> = {
  value: T,
  left: Tree<T>,
  right: Tree<T>
}
```

与交叉类型一起使用，我们可以创建出一些稀奇古怪的类型

```ts
type LinkedList<T> = T & { next: LinkedList<T> };

interface Person {
  name: string;
}

let people: LnkedList<Person>
let s = people.name
s = people.next.name
s = people.next.next.name
s = people.next.next.next.name;
```

然而，类型别名不能出现在声明右侧的任何地方

```ts
type Yikes = Array<Yikes>; //error
```

## 接口 vs. 类型别名
interface与type之间的细微差别

1. interface创建了一个新的名字，可以在其他地方使用。type并不创建新名字——比如，错误信息不会使用别名。在下面的示例代码里，在编译器中将鼠标悬停在interface上，显示它返回的是Interface，但悬停在aliased上时，显示的是对象字面量类型

```ts
type Alias = {num: number}
interface Interface {
  num: number
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;
```

在旧版本的TS里，type不能被继承和实现（也不能继承和实现其他类型）。在TS2.7开始，type可以被继承并生成新的交叉类型

因为软件中的秀爱那个应该对于扩展是开放的，但是对于修改是封闭的，应该尽量使用interface代替type
另一方面，如果你无法通过接口来描述一个类型并且需要使用联合类型或者元组类型，这时通常会使用type


## 字符串字面量类型
字符串字面量类型允许你指定字符串必须的固定值。在实际应用中，字符串字面量类型可以与联合类型，类型守卫和类型别名很好的配合。通过结合使用这些特性，你可以实现类似枚举类型的字符串

```ts
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out'
class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === 'ease-in') {

    } else if (easing === 'ease-out') {

    } else if (easing === 'ease-in-out') {
      
    } else {

    }
  }
}
let button = new UIElement()
button.animate(0, 0, 'ease-in')
button.animate(0, 0, 'uneasy') // error
```

字符串字面量类型还可以用于区分函数重载：
```ts
function createElement(tagName: 'img'): HTMLImageElement;
function createElement(tagName: 'input'): HTMLInputElement;

function createElement(tagName: string): Element {
  // ... code goes here ...
}
```

## 数字字面量类型
TS还具有数字字面量类型
```typescript
function rollDice(): 1 | 2| 3|4|5|6 {
  // ...
}

function foo(x: number) {
  if (x !== 1 || x !== 2) {
    // !== cannot be applied to types '1' and '2'
  }
}
```

换句话说，当x与2进行比较的时候，它的值必须为`1`，这就意味这上面的比较检查是非法的

## 可辨识联合
你可以合并单例类型，联合类型，类型守卫和类型别名来创建一个叫做**可辨识联合**的高级模式，他也称做标签联合或**代数数据类型**。可辨识联合在函数式编程里很有用处。一些语言会自动地为你辨识联合；而Ts则基于已有的JS模式。他具有三种要素：
1. 具有普通的单例类型属性————可辨识的特征
2. 一个类型别名包含了那些类型的联合——联合
3. 此属性上的类型首位

```ts

interface Square {
  kind: 'square'
  size: number
}
interface Rectangle {
  kind: 'rectangle'
  width: number
  height: number
}
interface Circle {
  kind: 'circle'
  radius: number
}
```

首先我们声明了将要联合的接口。每个接口都有`kind`属性但有不同的字符串字面量类型。`kind`属性称作**可辨识的特征**或者**标签**。其他的属性则特定于各个接口。注意，目前各个接口间是没有联系的。下面我们把他们联合到一起

```ts
type Shape = Square | Rectangle | Circle;
```

现在我们使用可辨识联合：
```ts
function area(s: Shape) {
  switch(s.kind) {
    case 'square': return s.size * s.size;
    case 'rectangle': return s.height * s.width;
    case 'circle': return Math.PI * s.radius ** 2
  }
}
```

### 完整性检查
当没有涵盖所有可辨识联合的变化时，我们想让编译器可以通知我们。比如，如果我们添加了Triangle到Shape，我们同时还需要更新area:
```ts
type Shape = Square | Rectangle | Circle | Triangle;
function area(s: Shape) {
  switch(s.kind) {
    case 'square': return s.size ** 2
    case 'rectangle': return s.height * s.width;
    case 'circle': return Math.PI * rs.radius ** 2
  }
  //  should error here -- we didn't handle case 'triangle'
}
```

有两种方式可以实现。首先是启用`--strictNullChecks`并且指定一个返回值类型：
```ts
function area(s: Shape): number { // error: returns number | undefined
  switch(s.kind) {
    case 'square': return s.size ** 2
    case 'rectangle': return s.height * s.width;
    case 'circle': return Math.PI * s.radius ** 2
  }
}

```

因为switch没有包含所有情况，所以Ts认为这个函数有时候会返回undefined，如果你明确地指定了返回值类型为`number`，那么你会看到一个错误，因为实际上返回值的类型为`number | undefined`.然而，这种方法存在有些微妙之处且`strictNullChecks`对旧代码支持不友好

第二种方法使用`never`类型，编译器用它来进行完整性检查：
```ts
function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x)
}
function area(s: Shape) {
  switch (s.kind) {
    case 'square': return s.size ** 2
    case 'rectangle': return s.height * s.width;
    case 'circle': return Math.PI * s.radius ** 2
    default: return assertNever(s); // error
  }
}
```
这里，`assertNever`检查`s`是否为`never`类型——即为除去所有可能后剩下的类型。如果你忘记了某个case，那么`s`将具有一个真实的类型并且你会得到一个错误。这种方式需要你定义一个额外的函数，但是你在忘记某个case的时候也更加明显

## 多态的this类型
多态的this类型表示的是某个包含类或接口的**子类型**。这被称作**F-bounded**多态性。它能很容易的表现连贯接口间的继承。比如，在计算器的例子里，在每个操作之后都返回`this`类型。


### 索引类型和字符串类型签名

`keyof` 和 `T[K]`与字符串索引签名进行交互。索引签名的参数类型必须为`number`和`string`.如果你有一个带有字符串索引签名的类型，那么`keyof T`会是`string | number`。（并且只有`string`，因为在JS里，你可以使用字符串`object['42']`或数字`object[42]`索引来访问对象属性。并且`T[string]`为索引签名的类型：

```ts
interface Dictionary<T> {
  [key: string]: T;
}
let keys: keyof Dictionary<number>; // string | number
let value: Dictionary<number>['foo'] // number
```

如果一个类型带有数字索引签名，那么`keyof T`为`number`

```ts
interface Dictionary<T> {
  [key: number]: T;
}
let keys: keyof Dictionary<number>; // number
let value: Dictionary<number>['foo']; // Error foo是字符串
let value: Dictionary<number>[42] // number
```

## 映射类型
一个常见的任务是将一个已经的类型每个属性都变成可选的

```ts
interface PersonPartail {
  name?: string;
  age?: number;
}
```

或者我们想要一个只读版本
```ts
interface PersonReadonly {
  readonly name: string;
  readonly age: number
}
```

这在JS里经常出现，TS提供了旧类型中创建新类型的一种方式——**映射类型**。在映射类型里，新类型以相同的形式去转换旧类型里每个属性。例如，你可以令每个属性成为`readonly`类型或可选的。

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
type Partial<T> = {
  [P in keyof T]?: T[P]
}
```

需要注意的是这个语法描述的是类型而非成员。若想添加成员，则可以使用交叉类型

```ts

// this is okay
type PartialWithNewMember<T> = {
  [P in keyof T]?: T[P]
} & { newMember: boolean }

// error
type PartialWithNewMember<T> = {
  [P in keyof T]?: T[P]
  newMember: boolean
}
```

现一下映射类型和它的组成部分
```ts
type Keys = 'option1' | 'option2'
type Flags = { [K in Keys]: boolean };
```

他的语法与索引签名的语法类似，内部使用了`for...in`。具有三个部分
1. 类型变量K，它会依次绑定到每个苏醒
2. 字符串字面量联合的`Keys`，它包含了要迭代的属性名的集合。
3. 属性的结果类型

这个简单的例子里，`Keys`是硬编码的属性名列表并且属性类型永远是`boolean`，因此这个映射类型等同于：
```ts
type Flags = {
  option1: boolean;
  option2: boolean;
}
```

在真正的应用里，可能不同于上面的`Readonly`或`Partial`。它们会基于一些已存在的类型，且按照一定的方式转换字段。这就是`keyof`和索引访问类型要做的事情

```ts
type Nullable<T> = { [P in keyof T]: T[P] | null }
type Partial<T> = { [P in keyof T]?: T[P] }
```

在这些例子里，属性列表是`keyof T`且结果类型是`T[P]`的变体。这时使用通用映射类型的一个好模板。因为这类转换是同态的，映射只作用于`T`的属性而没有其他的。编译器知道在添加任何新属性之前，可以拷贝所有存在的属性修饰符。例如，假设`Person.name`是只读的，那么`Partial<Person>.name`将是只读且为可选

下面是另一个例子，`T[P]`被包装在`Proxy<T>`类里：
```ts
type Proxy<T> = {
  get(): T;
  set(value: T): void
}
type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>
}
function proxify<T>(o: T): Proxify<T> {
  // ... wrap proxies ...
}
let proxyProps = proxify(props);
```

`Readonly<T>`与`Partial<T>`用处不小，因此它们与`Pick`和`Record`一同被包含进了TS的标准库里：

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
type Record<K extends keyof any, T> = {
  [P in K]: T;
}
```