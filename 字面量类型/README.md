# 字面量类型

## 介绍
一个字面量是一个集体类型中更为具体的子类型。意思是：`Hello World`是一个`string`，但是一个`string`不是类型系统中的`Hello World`。
目前TS中有三种可用的字面量类型集合，分别是：字符串、数字和布尔值。通过使用字面量类型，你可以规定一个字符串、数字或布尔值必须含有的确定值

## 字面量收窄
当你通过`var`或`let`来声明一个变量时，实际上你再告诉编译器这个变量中的内容有可能会被改变。与之相对地，用`const`来声明对象让TS知道这个对象永远不会被改变

```ts
const helloWorld = 'hello world'
let hiWorld = 'Hi world'
```

从无穷多种可能的例子（string变量的值由无穷多种）到一个更小、确定数量的例子（在上述例子中，"Hello World"的可能值只有一种）的过程叫作收窄

## 字符串字面量类型
字面量类型可以通过联合联系、类型守卫、类型别名来结合实际字符串值。通过这种特性，我们可以获取一种字符串并使其有类似枚举(enum)的行为
```ts
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out'
class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === 'ease-in') {

    } else if (easing === 'ease-out') {
    } else if (easing === 'ease-in-out') {
    } else {
      // It's possible that someone could reach this
      // by ignoring your types though.
    }
  }
}

let button = new UIElement();
button.animate(0, 0, 'ease-in')
button.animate(0, 0, 'uneasy')
// Error: Argument of type "uneasy" is not assignable to parameter of type 'Easing'
```

你可以传递三种允许的字符串，但是如果传递其他的字符串会受到如下错误：

字符串字面可以通过相同的方式用来分别重载：
```ts
function createElement(tagName: 'img'): HTMLImageElement;
function createElement(tagName: 'input'): HTMLInputElement;
// more overloads
function createElement(tagName: string): Element {
  // ... code goes here ...
}
```

## 数字字面量类型
TS还有数字字面量类型，它的行为和上述字符串字面量类型相同
```ts
function rollDice(): 1|2|3|4|5|6 {
  return (Math.floor(Math.random() * 6) + 1) as 1|2|3|4|5|6
}
const result = rollDice()
```

数字字面量类型经常用来描述配置值：
```ts
interface MapConfig {
  lng: number;
  lat: number;
  tileSize: 8 | 16 | 32
}
setupMap({lng: -73.012938, lat: 40.23039, titleSize: 16})
```


## 布尔字面量类型
TS还有布尔值字面量类型，你可以通过他们来约束某些属性之间互有关联的对象
```ts
interface ValidationSuccess {
  isValid: true;
  reason: null;
}

interface ValidationFailure {
  isValid: false;
  reason: string;
}

type ValidationResult = ValidationResult | ValidationFailure;
```