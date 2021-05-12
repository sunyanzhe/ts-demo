#数据类型

## Boolean
最基本的数据类型就是true/false值，在js和ts叫`boolean`

```typescript
let isDone: boolean = false;
```

## Number
和JavaScript一样，Typescript里的所有数字是浮点数或者大整数。这些浮点数的类型是`number`，而大整数的类型则是`bigint`。除了支持十进制和十六进制字面量，Typescript还支持ECMAScript 2015中引入的二进制和八进制

```typescript
let decLiteral: number = 6
let hexLiteral: number = 0xf00d
let binaryLiteral: number = 0b1010
let octalLiteral: number = 0o744
let bigLiteral: bigint = 100n 
```

## String
```typescript
let name: string = 'bob'
let age: number = 37
let setence: string = `Hello, my name is ${name}.
  I'll be ${age + 1} years old next month.
`
```

## Array
TypeScript想JavaScript一样可以操作数组元素。有两种方式可以定义数组。第一种，可以在元素类型后面接上[]，表示由此类型元素组成的一个数组：
```typescript
let list: number[] = [1,2,3]
let list2: Array<number> = [1,2,3]
```

## Tuple
元组类型允许表示一个一直元素数量和类型的数组，各元素的类型不必相同，比如，你可以定义一对值分别为`string`和`number`类型的元组
```typescript
let x: [string, number];
// Initialize it
x = ['hello', 10]

// Initialize it incorrectly
x = [10, 'hello'] // Error
```

当访问一个已知索引的元素，会得到正确的类型
当访问一个越界的元素会报错
```typescript
x[3] = 'world'
```

## Enum
`enum`类型是对JavaScript标准数据类型的一个补充。
使用枚举类型可以为一组数值赋予友好的名字

```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green
```

默认情况下，从0开始为元素编号。你也可以手动的指定成员的数量。例如，我们将上面的例子改成从1开始编号：

```typescript
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green
```

或者，全部都采用手动赋值：
```typescript
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
```

枚举类型提供的一个便利是你可以由枚举的值得到它的名字。例如我们知道数值为2，但是不确定它映射到Color里的那个名字，我们可以查找响应的名字

```ts
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2]

console.log(colorName)
```

## Unknown
当我们在写应用的时候可能会需要描述一个我们还不知道其类型的变量。这些值可以来自动态内容，例如从用户获得，或者我们想在我们的API中接收所有可能类型的值。在这些情况下，我们想要让编译器以及未来的用户知道这个变量可以是任意类型。这个时候我们会对他使用`unknow`类型

## Any
有时候，我们想要为那些在变成阶段还不清楚的变量指定一个类型。这些值可能来自动态的内容，比如来自用户输入或第三方代码库。这种情况下，我们不希望类型检查器对这些值进行检查而是直接让他们通过编译阶段的检查。那么我们可以使用`any`类型来标记这些变量：

```ts
let notSure: any = 4
notSure = 'maybe a string instead'
notSure = false
```

在对现有代码进行改写的时候，`any`类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。你可能认为`Object`有相似的作用，就像它在其他语言中那样。但是`Object`类型的变量只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法，即使他真的有这些方法

```ts
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'
```
> 注意：应避免使用Object，而是使用非原始object类型

当你只知道一部分数据类型时，`any`类型也是有用的。比如，你有一个数组，它包含了不同的类型的数据：
```ts
let list: any[] = [1, true, 'free']
list[1] = 100
```

## Void
某种程度上说，void类型像是与any类型相反，他表示没有任何类型。当一个函数没有返回值时，他同创汇见到其返回类型是`void`
```ts
function warnUser(): void {
  console.log('This is my warning message')
}
```

声明一个void类型的变量没有什么大用，因为你只能为它赋予null（只在--stricNullChecks未指定时）和`undefined`

```ts
let unusable: void = undefined
```


## Null 和 Undefined
TypeScript里，`undefined`和`null`两者各自有自己的类型分别叫做`undefined`和`null`。和`void`相似，它们的本身的类型用处不是很大：

```ts
let u: undefined = undefined;
let n:null = null
```

然而，当你指定了`--strictNullChecks`标记，`null`和`undefined`只能赋值给`any`和它们各自的类型（有一个例外是`undefined`还可以赋值给`void`类型）。这能避免很多常见问题。也许在某处你想传入一个`string`或`null`或`undefined`，你可以使用联合类型`string | null | undefined`。

联合类型是高级主题，我们会在以后的章节讨论它

## Never
`never`类型表示的是那些用不存在的值的类型。例如，`never`类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型；变量也可能是`never`类型，当他们永不为真的类型保护所束缚时

`never`类型是任何类型的子类型，也可以赋值给任何类型；然而没有类型是`never`的子类型或可以赋值给`never`类型（除了`never`本身之外）。即使`any`也不可以赋值给`never`

```ts
// 返回never的函数必须存在无法到达的重点
function error(message: string): never {
  throw new Error(message)
}

// 推断的返回值类型为never
function fail() {
  return error('Something failed')
}

// 返回never的函数必须存在无法到达的重点
function infiniteLoop(): never {
  while(true) {

  }
}
```

## Object 
`object`表示非原始类型，也就是除`number`,`string`,`boolean`,`bigint`,`symbol`,`null`或`undefined`之外的类型。

使用`object`类型，就可以更好的表示像`Object.create`这样的API。例如：
```ts
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42);   // Error
create('string'); // Error
create(false);  // Error
create(undefined);  // Error
```

## 类型断言
有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息，通常这回发生在你清楚地知道一个实体具有比它现有类型更确切的类型

通过断言类型这种方式可以告诉编译器，“相信我，我知道自己在干什么”。类型断言好比其他语言里的类型转换，但是不进行特殊的数据检查和解构。它没有运行时的影响，只是在编译阶段起作用。TypeScript会假设你，程序要，已经进行了必须的检查。
```ts
let someValue: any = 'this is a string'

let strLength: number = (<string>someValue).length
```

另外一种`as`语法：
```ts
let someValue: any = 'this is a string';

let strLength: number = (someValue as string).length
```