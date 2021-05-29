# 模块
> 关于术语的一点说明：务必注意一点，TS1.5中术语发生了变化。“内部模块”现在称做“命名空间”。“外部模块”现在则简单称为“模块”，这是为了与ECMAScript2015里的术语保持一致。


## 介绍
从ECMAScript 2015开始，Js引入了模块概念，TS也沿用这个概念
模块在其自身的作用域里执行，而不是在全局作用域里；这意味着定义在一个模块里的变量，函数，类等等在模块外部是不可见的，除非你明确地使用export性质之一到处他们。相反，如果想使用其他模块到处的变量，函数，类，接口等的时候，你必须要导入它们，可以使用import形式之一

模块是自声明的；两个模块之间的关系是通过在文件级别上使用imports和exports建立的

模块使用模块加载器去导入其他的模块。在运行时，模块加载器的作用是在执行次模块代码前去查找并执行这个模块的所有依赖。

TS与ECMAScrip 2015一样，任何包含顶级`import`或者`export`的文件都被当成一个模块。相反地，如果一个文件不带有顶级声明，那么内容被视为全局可见

## `export =`和 `import = require()`
CommonJS和AMD的exports都可以被赋值为一个对象，类似于es6语法中的`default`。虽然作用相似，但是`export default`语法并不能兼容CommonJs和AMD的`exports`

为了支持CommonJS和AMD的`exports`，TS提供了`export = `语法。

`export = `语法定义一个模块的导出`对象`，若使用`export = `导出一个模块，则必须使用TypeScript的特定语法`import module = require('module')`来导入此模块。


```ts
let number:Regexp = /^[0-9]+$/
class ZipCodeValidator {
  isAcceptabe(s: string) {
    return s.length === 5 && numberRegexp.test(s)
  }
}
export = ZipCodeValidator
```

```ts
import zip = require('./ZipCodeValidator')

// Some samples to try

let strings = ['hello', '98052', '1001']

let validator = new zip()

strings.forEach(s => {
  cosnole.log(`"${s}" - ${validator.isAcceptabe(s) ? 'match' : 'dont match'}`)
})

```

## 使用其他的JS库
要想描述非TS便携的类库的类型，我们需要声明类库所暴露出的API
我们叫它声明因为他不是'外部程序'的具体实现。他们通常是在`.d.ts`文件里定义的

### 外部模块
在Node.js里大部分工作是通过加载一个或多个模块实现的。我们可以使用顶级的`export`声明来为每个模块都定义一个`.d.ts`文件，但最好还是写在一个大的`.d.ts`文件里。我们使用与构造一个外部命名空间相似的方法，但是这里使用`module`关键字并且把名字用引号括起来，方便之后`import`。例如：

**node.d.ts(simplified excerpt)**
```ts
declare module 'url' {
  export interface Url {
    protocol?: string;
    hostname?: string;
    pathname?: string;
  }
  export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url;
}

declare module "path" {
  export function normalize(p: string): string;
  export function join(...paths: any[]): string;
  export let sep: string;
}
```
可以`/// <reference> node.d.ts`并且使用`import url = require(url);`或`import * as URL from "url"`加载模块

```ts
/// <reference path="node.d.ts">
import * as URL from 'url'
let myUrl = URL.parse('http:/www.typescriptlang.org')
```


## 外部模块简写
加入你不想在使用一个新模块之前花时间去编写声明，可以采用声明的简写形式以便能够快速使用它

**declarations.d.ts**

```ts
declare module "hot-new-module"
```
简写模块里所有导出的类型将是`any`

```ts
import x, {y} from 'hot-new-module'
x(y)
```

**模块声明通配符**
某些模块加载器如SystemJS和AMD支持导入非Javascript内容。它们通常会使用一个前缀或后缀表示特殊的加载语法。模块声明通配符可以用来表示这些情况。

```ts
declare module "*!text" {
  const content: string;
  export default content;
}
// Some do it the other way around.

declare module "json!*" {
  const value: any;
  export default value;
}
```

现在你可以就导出匹配"*!text"或"json!*"的内容了

```ts
import fileContent from './xyz.txt!text';
import data from 'json!http://example.com/data.json';
console.log(data, fileContent);
```

## 创建模块结构指导

### 尽可能地在顶层导出
用户应该更容易地使用你模块导出的内容。嵌套层次过多会变得难以处理，因此仔细考虑一下如何组织你的代码

从你的模块中导出一个命名空间就是一个增加嵌套的例子。虽然命名空间有时候有它们的用处，在使用模块的时候它们额外地增加了一层。这对用户来说是很不便的并且通常是多余的。

导出类的静态方法也有同样的问题 - 这个类本身就增加了一层嵌套。除非它能方便表述或便于清晰使用，否则请考虑直接导出一个辅助方法。

**如果仅导出单个class或function，使用export default**

就像“在顶层上导出”帮助减少用户使用的难度，一个默认的导出也能起到这个效果。如果一个模块就是为了导出特定内容，那么你应该考虑使用一个默认导出。这会令模块的导入和使用变得些许简单。

**MyClass.ts**
```ts
export default class Sometype {
  constructor() { ... }
}
```

**MyFunc.ts**
```ts
export default function getThing() { return 'thing'; }
```

**Consumer.ts**

```ts
import t from './MyClass'
import f from './MyFunc'
let x = new t()
console.log(f())
```

对用户来说这是最理想的。他们可以随意命名导入模块的类型（本例为`t`）并且不需要多余的（.）来找到相关对象。

**如果要导出多个对象，把他们放在顶层里导出**

**MyThing.ts**

```ts
export class Sometype { /* ... */ }
export function someFunc() { /* ... */ }
```
相反地，当导入的时候：

**明确地列出导入的名字**

**Consumer.ts**
```ts
import {SomeType, SomeFunc} from './MyThing'
let x = new SomeType()
let y = someFunc()
```

使用命名空间导入模式当你要导出大量内容的时候

```ts
export class Dog { ... }
export class Cat { ... }
export class Tree { ... }
export class Flower { ... }
```

```ts
import * as mylargeModule from './MyLargeModule.ts'
let x = new mylargemodule.Dog();
```


### 模块里不要使用命名空间
当初次进入基于模块的开发模式时，可能总会控制不住要将导出包裹在一个命名空间里。模块具有其自己的作用域，并且只有导出的声明才会在模块外部可见。记住这点，命名空间在使用模块时几乎没什么价值

在组织方面，命名空间对于在全局作用域内对逻辑上相关的对象和类型进行分组是很便利的。例如，在C#里，你会从`System.Collections`里找到所有集合的类型。通过将类型有层次地组织在命名空间里，可以方便用户找到与使用那些类型。然而，模块本身已经存在与文件系统中，这是必须的。我们必须通过路径和文件名找到它们，这已经提供了一种逻辑上的组织形式。我们可以创建`/collections/generic/`文件夹，把相应模块放在这里面。

命名空间对解决全局作用域里命名冲突来说很重要的。比如，你可以有一个`My.Application.Customer.AddForm`和`My.Application.Order.AddForm`两个类型的名字相同，但命名空间不同。然而，对于模块来说却不是一个问题。在一个模块里，没有理由两个对象拥有同一个名字。从模块的使用角度来说，使用者会挑出他们用来引用模块的名字，所以也没有理由发生重名的情况。

### 危险信号
以下均为模块结构上的危险信号。重新检查以确保你没有在对模块使用命名空间：
* 文件的顶层声明是`export namespace Foo { ... }` (删除`Foo`并把所有内容向上层移动一层)
* 多个文件的顶层具有同样的`export namespace Foo {` (不要意味这些会合并到一个Foo中)