## 回调函数类型
### 回调函数的返回值类型
不要为返回值会被忽略的回调函数设置返回值类型`any`
```ts
/* 错误 */
function fn(x: () => any) {
  x()
}
```

应该为返回值会被忽略的回调函数设置返回值类型`void`：
```ts
// correct
function fn(x: () => void) {
  x()
}
```

### 回调函数里的可选参数
不要在回调函数里使用可选参数，除非这是你想要的
```ts
// wrong
interface Fetcher {
  getObject(done: (data: any, elapsedTime?: number) => void): void
}
```

这里有具体的意义：`done`毁掉函数可以用1个参数或2个参数调用。代码的大意是说该回调函数不关注是否有`elapsedTime`参数，但是不需要把这个参数定义为可选参数来达到此目的 -- 因为总是允许提供一个接受较少参数的回调函数。

应该将回调函数定义为无可选参数：
```ts
// correct
interface Fetcher {
  getObject(done: (data: any, elapsedTime: number) => void): void
}
```

### 重载与回调函数
不要因为回调函数的参数数量不同而编写不同的重载
```ts
// wrong
declare function beforeAll(action: () => void, timeout?: number): void
declare function beforeAll(
  action: (done: DoneFn) => void
  timeout?: number
): void
```

应该只为最大数量参数的情况编写一个重载：
```ts
// correct
declare function beforeAll(
  action: (done: DoneFn) => void,
  timeout?: number
): void;
```
原因：回调函数总是允许忽略某个参数的，因此没必要为缺少可选参数的情况编写重载。为缺少可选参数的情况提供重载可能会导致类型错误的回调函数被传入，因为它会匹配第一个重载。

## 函数重载
### 顺序
不要把模糊的重载放在具体的重载前面：

```ts
// wrong
declare function fn(x: any): any
declare function fn(x: HTMLElement): number
declare function fn(x: HTMLDivElement): string

var myElem: HTMLDivElement;
// var x = fn(myElem); // x: any, wat?
```

应该将重载排序，把具体的排在模糊的之前：

```ts
// correct
declare function fn(x: HTMLDivElement): string;
declare function fn(x: HTMLElement): number;
declare function fn(x: any): any;

var myElem: HTMLDivElement;
var x = fn(myElem); // x: string, :)
```

原因：当解析函数调用的时候，TS会选择匹配到的第一个重载。当位于前面的重载比后面的更“模糊”，那么后面的会被隐藏且不会被选用。

### 使用可选参数
不要因为之后末尾参数不同而编写不同的重载：

```ts
// wrong
interface Example {
  diff(one: string): number;
  diff(one: string, two: string): number;
  diff(one: string, two: string, three: boolean): number
}
```
应该尽可能使用可选参数

```ts
// correct
interface Example {
  diff(one: string, two?: string, three?: boolean): number
}
```
注意，这只在返回类型相同的情况下是没有问题的

原因： 有以下两个重要原因
TS解析签名兼容性时会查看是否某个目标签名能够使用原参数调用，且允许额外的参数。下面的代码仅在签名被正常地使用可选参数定义时才会暴露出一个bug：

```ts
function fn(x: (a: string, b: number, c: number) => void) {}
var x: Example;
// When written with overloads, OK -- used first overload
// When written with optionals, correctly an error
fn(x.diff)
```

第二个原因是当使用了TypeScript“严格检查null”的特性时。因为未指定的参数在Javascript里表示为`undefined`，通常明确地为可选参数传入一个`undefined`不会有问题。这段代码在严格`null`模式下可以工作：
```ts
let x: Example
x.diff('something', true ? undefined : 'hour')
```

### 使用联合类型
不要仅因某个特性位置上的参数类型不同而定义重载：

```ts
// wrong
interface Moment {
  utcOffset(): number;
  utcOffset(b: number): Moment;
  utcOffset(b: string): Moment;
}
```

尽可能使用联合类型：

```ts
// correct
interface Moment {
  utcOffset(): number;
  utcOffset(b: number | string): Moment;
}
```

注意，我们没有让`b`成为可选的，因为签名的返回值类型不同。
原因： 这对于那些为该函数传入了值的使用者来说很重要
```ts
function fn(x: string): void
function fn(x: number): void
function fn(x: number | string) {
  // When written with separate overloads, incorrectly an error
  // When written with union types, correctly OK
  return moment().utcOffset(x)
}
```