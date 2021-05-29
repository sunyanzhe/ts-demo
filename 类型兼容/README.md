## 介绍
TS里的类型兼容性是基于结构子类型的。结构类型是一种只使用其成员来描述类型的方式。它正好与名义（nominal）类型形成对比。（注：这基于名义类型的类型系统中，数据类型的兼容性或等价性是通过明确的声明和/或类型的名称来决定的。这与结构性类型系统不同，它是基于类型的组成结构，且不要求明确地声明。）看下面的例子：
```ts
interface Named {
  name: string
}
class Person {
  name: string
}
let p: Named
// Ok, because of structural typing
p = new Person
```

在使用基于名义类型的语言，比如C#或Java中，这段代码会报错，因为Person类没有明确说明其实现了Named接口

TS的结构性子类型是根据Javascript代码的典型写法来设计的。因为Js里广泛使用匿名对象，例如函数表达式和对象字面量，所以使用结构类型系统来描述这些类型比使用名义类型系统更好。

### 关于可靠性的注意事项
TS的类型系统允许某些在编译阶段无法确认其安全性的操作。当一个类型系统具此属性时，被当作是“不可靠的”。TS允许这种不可靠行为的发生是经过仔细思考的。通过这篇文章，我们会解释什么时候会发生这种情况和其有利的一面。

## 开始
TS结构化类型系统的基本规则是，如果x想要兼容y那么y至少具有与x相同的属性
```ts
interface Named {
  name: string
}
let x: Named;
let y = {name: 'Alice', location: 'Seattle'}
x = y //okay
```

这里要检查`y`是否能赋值给`x`，编译器检查`x`中的每个属性，看是否能在`y`中也找到对应属性。这个例子中，`y`必须包含名字是`name`的`string`类型成员。`y`满足条件，因此赋值正确

检查函数参数时使用相同的规则：
```ts
function greet(n: Named) {
  console.log('Hello, ' + n.name);
}

greet(y) // ok
```

注意，y有个额外的location属性，但不会引发错误。只有目标类型（这里是`Named`）的成员会被——检查是否兼容。
这个比较过程是递归进行的，检查每个成员及子成员。

## 比较两个函数
相对来讲，在比较原始类型和对象类型的时候是比较容易理解的，问题是如何判断两个函数是兼容的。下面我们从两个简单的函数入手，它们仅是参数列表略有不同：
```ts
let x = (a: number) => 0
let y = (b: number, s: string) => 0

y = x // OK
x = y // Error
```

要查看`x`是否能赋值给`y`，首先看它们的参数列表。`x`的每个参数必须能在`y`里找到对应类型的参数。注意的是参数的名字相同与否无所谓，只看它们的类型。这里，`x`的每个参数在`y`中都能找到对应的参数，所以允许赋值。

第二个赋值错误，因为y有一个必须的第二参数，但是`x`并没有，所以不允许赋值。

你可能会疑惑为什么允许忽略参数。原因是忽略而外的参数在JS里是很常见的

### 函数参数双向协变
当比较函数参数类型时，只有当源函数参数能够赋值给目标函数或反过来时才能赋值成功。这是不稳定的，因为调用者可能传入了一个具有更精确类型信息的函数，但是调用这个传入的函数的时候却使用了不是那么精确的类型信息。实际上，这极少会发生错误，并且能够实现很多JS里的常见模式。
```ts
enum EventType { Mouse, Keyboard }
interface Event { timestamp: number; }
interface MouseEvent extends Event { x: number; y: number }
interface KeyEvent extends Event { keyCode: number }
function listenEvent(eventType: EventType, handler: (n: Event) => void) { /* ... */ }

// Unsound, but useful and common
// 不健全，但是普通游泳
listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + ',' + e.y))

listenEvent(EventType.Mouse, (e: Event) => console.log((e as MouseEvent).x + ',' + (e as MouseEvent).y))

listenEvent(EventType.Mouse, ((e: MouseEvent) => console.log(e.x + ',' + e.y)) as (e: Event) => void)

// 不允许明确错误，对完全不兼容的类型会强制检查 
listenEvent(EventType.Mouse, (e: number) => console.log(e))
```

### 类的私有成员和受保护成员
类的私有成员和受保护成员会影响兼容性。当检查类实例的兼容时，如果目标类型包含一个私有成员，那么源类型必须包含来自同一个类的这个私有成员。同样地，这条规则也适用于包含受保护成员实例的类型检查。这允许子类型赋值给父类，但是不能赋值给其他有同样类型的类。

## 泛型
因为TS是结构性的类型系统，类型参数只影响使用其做为类型一部分的结果类型
```ts
interface Empty<T> {}
let x: Empty<number>
let y: Empty<string>

x = y // OK
```

上面代码里，`x`和`y`是兼容的，因为它们的结构使用类型参数时并没有什么不同。把这个例子改变一下，增加一个成员，就能看出是如何工作的了
```ts
interface NotEmpty<T> {
  data: T
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;

x = y // error, x and y are not compatible
```

在这里，泛型类型在使用时就好比不是一个泛型类型
对于没置顶泛型类型的泛型参数时，会把所有泛型参数当成`any`比较。然后用结果类型进行比较，就像上面第一个例子

比如，
```ts
let identity = function<T>(x: T): T {
  // ...
}
let reverse = function<U>(y: U): U {
  // ...
}
identity = reverse // ok, beacuse (x: any) => any matches (y: any) => any
```

## 高级主题
### 子类型与赋值
目前为止，我们使用了‘兼容性’，他在语言规范里没有定义。在TS里，有两种兼容性：子类型和赋值。它们的不同点在于，赋值扩展了子类型兼容性，增加了一些规则，允许和`any`来回赋值，以及`enum`和对应数字值之间的来回赋值

语言里的不同的饭分别使用了它们之中的机制。实际上，类型兼容性是由赋值兼容性来控制的，即使在`implements`和`extends`语句也不例外
