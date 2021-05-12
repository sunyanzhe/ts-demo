# 函数

## 介绍
函数是JavaScript应用程序的基础。他帮助你实现抽象层，模拟类，信息隐藏和模块。在TS里，虽然已经支持类，命名空间和模块，但函数仍然是主要的定义行为的地方。TS为JS函数添加了额外的功能，让我们可以更容易地使用。

## 函数
和JS一样，TS函数可以创建有名字的函数和匿名函数。你可以随意选择适合应用程序的方式，不论是定义一系列API函数还是只使用一次的函数。

通过下面的例子可以迅速回想起这两种JS中的函数：

```ts
// Named function
function add(x, y) {
  return x + y
}

// Anonymous function
let myAdd = function(x, y) { return x + y; }

```

在JS里，函数可以使用函数体外部的变量。当函数这么做时，我们说它`获取`了这些变量。至于为什么可以这样做以及其中的利弊超出了本文的范围，但是深刻理解这个机制对学习JS和TS会很有帮助

```ts
let z = 100;

function addToZ(x, y) {
  return x + y + z
}
```

## 函数类型

### 为函数定义类型
让我们为上面那个函数添加类型：

```ts

function add(x: number, y: number): number {
  return x + y;
}
let myAdd = function(x: number, y: number): number {return x + y}

```

我们可以给每个参数添加类型之后再为函数本身添加返回值类型。TS能够根据返回语句自动推断出返回值类型，因此我们通常省略它。

## 书写完整函数类型

现在我们已经为函数指定了类型，下面让我们写出函数的完整类型

```ts
let myAdd: (x: number, y: number) => number = 
  function(x: number, y: number): number {return x + y}
```

函数类型包含两部分：参数类型和返回值类型。当写出完整函数类型的时候，这两部分都是需要的。我们以参数列表的形式写出参数类型，为每个参数指定一个名字和类型。这个名字只是为了增加可读性

```ts
let myAdd: (baseValue: number, increment: number) => number =
  function(x: number, y: number): number {return x+y}
```

只要参数类型是匹配的，那么就认为他是有效的函数类型，二不在乎函数名是否正确
第二部分是返回值类型。对于返回值，我们在函数和返回值类型之间使用(=>)符号，使之清晰明了。如之前提到的，返回值类型是函数类型的必要部分，如果函数没有返回任何值，你也必须制定返回值类型为`void`而不能留空

函数的类型只是由参数类型和返回值组成的。函数中使用的捕获变量不会体现在类型里。实际上，这些变量是函数的隐藏状态并不是组成API的一部分

### 推断类型
尝试这个例子的时候，你会注意到，就算尽在等式的一侧带有类型，TS编译器仍可以正确识别类型
```ts
// myAdd has the full function type
let myAdd = function(x: number, y: number):number { return x + y }

// The parameters `x` and `y` have the type number
let myAdd: (baseValue: number, increment: number) => number = 
  function(x, y) { return x + y }
```

## 可选参数和默认参数

TS里的每个函数参数都是必须的。这不是指不能传递null或undefined作为参数，俄日实说编译器检查用户是否为每个参数都传入了值。编译器还会假设只有这些参数会被传递进函数。简单的说，传递给一个函数的参数个数必须与函数期望的参数个数一致

## this参数
不幸的是，this的类型依旧为any。这是因为this来自对象字面量里的函数表达式。修改的方法是，提供一个显示`this`的参数。this参数是个假的参数，他出现在参数列表的最为前面
```ts
function f(this: void){
  // make sure this is unusable in this standalone function
}
```

让我们往例子里添加一些接口，Card和Deck，让类型重用能够变得清晰简单些：
```ts
interface Card {
  suit: string;
  card: number;
}

interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}

let deck: Deck = {
  suits: ['hearts','spades','clubs','diamonds'],
  cards: Array(52),
  // 指定这个函数的this必须是一个Deck类型
  createCardPicker: function(this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return {suit: this.suits[pickedSuit], card: pickedCard % 13};
    }
  }
}

```

现在TS知道`createCardPicker`期望在某个`Deck`对象上调用。也就是说`this`是`Deck`类型的，而非`any`，因此`--noImplictitThis`不会报错了。

## 回调里的this参数
当你讲一个函数传递到某个库函数里在稍后被调用时，你可能也见到过回调函数里的`this`会报错。因为当回调函数被调用时，他会被当成一个普通函数调用，`this`将作为`undefined`。稍作修改，你就可以通过`this`参数来避免错误。首先，库函数的作者要指定`this`的类型

```ts
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}
```

`this:void`意味着`addClickListener`期望`onclick`是一个函数且他不需要一个`this`类型。然后，为调用代码里的`this`添加类型注解：

```ts
class Handler {
  info: string;
  onClickBad(this: Handler, e: Event) {
    // 
  }
}
```

## 重载
js本身是动态语言。JS里函数根据传入不同的参数而返回不同类型的数据是很常见的
```ts
let suits = ['hearts', 'spades', 'clubs', 'diamonds']

function pickCard(x): any {
  if (typeof x == 'object') {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  else if (typeof x == 'number') {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

```

方法是同一个函数提供多个函数类型定义来进行函数重载。编译器会根据这个列表去处理函数的调用。下面我们来重载`pickCard`函数

```ts
let suits = ['hearts', 'spades', 'clubs', 'diamonds']
function pickCard(x: {suit: string; card: number;}[]): number;
function pickCard(x: number): {suit: string; card: number;}
function pickCard(x): any {
  if (typeof x == 'object') {
    let pickedCard = Math.floor(Math.random * x.length);
    return pickedCard;
  } else if (typeof x == 'number') {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}
```

这样改变后，重载的`pickCard`函数在调用的时候回进行正确的类型检查。
为了让编译器能够选择正确的检查类型，它与js里的处理流程相似，它查找重载列表，尝试使用第一个重载定义。如果匹配的话就是用这个。因此，在定义重载的时候，一定要把最精确的定义放在最前面。

注意，`function pickCard(x): any`并不是重载列表的一部分，因此这里只有两个重载：一个是接收对象另一个接收数字。以其他参数调用`pickCard`会产生错误。