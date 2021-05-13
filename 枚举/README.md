# 枚举
## 介绍
使用枚举我们可以定义一些带名字的常量。使用枚举可以清晰第表达意图或创建一组有区别的用例。TS支持数字和基于字符串的枚举

## 数字枚举
```ts
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}
```

初始值，Up为1。其余的成员会从1开始自动增长。Down为2，Left为3，Right为4

我们还可以完全不实用初始化器：
```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}
```
现在，Up为0，Down为1等等

使用枚举很简单：通过枚举的属性来访问枚举成员，和枚举的名字来访问枚举的类型

```ts
enum Response {
  No = 0,
  Yes = 1
}

function respond(recipient: string, message: Response): void {
  // ...
}

respond("Princess Caroline", Response.Yes)
```

数字枚举可以被混入到计算过的和常量成员。简单的说，没有初始化器的成员要么在首位，要么必须在用数值常量或其他常量枚举成员初始化的数值枚举之后。下面这种情况是不允许的

```ts
enum E {
  A = getSomeValue(),
  B, // Error! Enum member must have initializer.
}
```

## 字符串枚举
字符串枚举的概念很简单，但是有细微的运行时的差别。在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。

```ts
enum Direction {
  Up = "UP",
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}
```
由于字符串枚举没有增长的行为，字符串枚举可以很好的序列化。换句话说，如果你正在调试并且必须要独一个数字枚举的运行时的值，这个值通常是很难读的-它并不能表达游泳的信息（尽管反向映射会有所帮助），字符串枚举允许你提供一个运行时有意义的并且可读的值，独立于枚举成员的名字。

## 异构枚举
从技术的角度来说，枚举可以混合字符串和数字成员，但是似乎你并不会这么做：
```ts
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES"
}
```

除非你真的想用利用Js运行时的行为，否则不建议这么做

## 计算的和常量成员
每个枚举成员都带有一个值，它可以是常量或计算出来的。当满足以下条件时，枚举成员会被当作常量
1. 他是枚举的第一个成员且没有初始化器，这种情况他被赋值为0

```ts
// E.X is constant:
enum E { X }
```

2. 他不带有初始化器且他之前的枚举成员是一个数字常量。这种情况下，当前枚举成员的值为它上一个枚举成员的值加1

```ts
// All enum members in 'E1' and 'E2' are constant.
enum E1 {X, Y, Z}
enum E2 {
  A = 1, B, C
}
```

3. 枚举成员使用常量枚举表达式初始化。常量枚举表达式是TS表达式的子集，它可以在编译阶段求值。当一个表达式满足下面条件之一时，他就是一个常量枚举表达式：
 i. 一个枚举表达式字面量（主要是字符串字面量或数字字面量）
 ii. 一个对之前定义的常量枚举成员的引用（可以是在不同的枚举类型中定义的）
 iii. 带括号的常量枚举表达式
 iv. 一元运算符+、-、～其中之一应用在了常量枚举表达式
 v. 常量枚举表达式作为二元运算符+、-、*、/、%、<<、>>、>>>、&、｜、^的操作对象

若常量枚举表达式求之后为`NaN`或`Infinity`，则会在编译阶段报错。

所有其他情况的枚举成员被当作是需要计算得出的值

```ts
enum FileAccess {
  None,
  Read  = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member
  G = '123'.length
}
```

## 联合枚举与枚举成员的类型
存在一种特殊的非计算的常量枚举成员的子集：字面量枚举成员。字面量枚举成员是指不带有初始值的常量枚举成员，或者是值被初始化为
* 任何字符串字面量（例如：'foo', 'bar', 'baz'）
* 任何数字字面量（例如：1，100）
* 应用了一元`-`符号的数字字面量（例如：`-1`，`-100`）

当所有枚举成员都拥有字面量枚举值时，它就带有了一种特殊的语义。
首先，枚举成员成为了类型。例如，我们可以说某些成员只能是枚举成员的值：
```ts
enum ShapeKind {
  Circle,
  Square,
}
interface Circle {
  kind: ShapeKind.Circle;
  radius: number
}
interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}
let c: Circle = {
  // Error! Type 'ShapeKind.Square' is not assignable to type 'ShapeKind.Circle'.
  kind: ShapeKind.Square,
  radius: 100
}
```

另一个变化是枚举类型本身成为了每个枚举成员的联合，只要通过联合枚举，类型系统能够利用这样一个事实，他可以知道枚举里的值的集合。因此，TS能够捕获在比较值的时候犯的愚蠢的错误。

```ts
enum E {
  Foo,
  Bar,
}

function f(x: E) {
  if (x !== E.Foo || x !== E.Bar){
    // Error! 只有两个值 始终为true
  }
}
```

这个例子里，我们先检查`x`是否不是`E.Foo`。如果通过了这个检查，然后`||`会发生短路效果，`if`语句体里的内容会被执行。然而，这个检查没有通过，那么x则只能为`E.Foo`，因此没理由再去检查它是否为`E.Bar`。


## 运行时的枚举
枚举是在运行时真正存在的对象
```ts
enum E {
  X, Y, Z
}
```

可以传递给函数
```ts
function f(obj: {x: number}) {
  return obj.X
}
f(E) // It's Ok
```

## 编译时的枚举
尽管一个枚举在运行时真正存在的对象，但`keyof`关键字行为与其作用在对象上时有所不同。应该使用`keyof typeof`来获取一个表示枚举里所有字符串`key`的类型
```ts
enum LogLevel {
  ERROR, WARN, INFO, DEBUG
}
/**
 * 等同于
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key];
  if (num <= LogLevel[key]) {
    console.log('Log level key is: ', key);
    console.log('Log level value is: ', num);
    console.log('Log level message is: ', message);
  }
}
```

## 反向映射
除了创建一个以属性名作为对象成员的对象之外，数字枚举成员还具有了反向映射，从枚举值到枚举名字。
```ts
enum Enum {
  A
}
let a: Enum = Enum.A
let nameofA: string = Enum[a]   //'A'
```

## const枚举
大多数情况下，枚举时十分有效的方案。然而在某些情况下需求很严格。为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用`const`枚举。常量枚举通过在枚举上使用`const`修饰符来定义。

## 外部枚举
外部枚举用来描述已经存在的枚举类型的形状

```ts
declare enum Enum {
  A = 1,
  B,
  C = 2
}
```

外部枚举和非外部枚举之间又一个重要的区别，在正常的枚举里，没有初始化方法的成员被当成常量成员。
对于非常量的外部枚举而言，没有初始化方法时被当作需要经过计算的
