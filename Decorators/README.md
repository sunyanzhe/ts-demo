# Decorators
## 类装饰器
如果类装饰器返回一个值，它会使用提供的构造函数来替换累的声明
> 注意，如果你返回一个新的构造函数，你必须注意处理好原来的原型链。在运行时的装饰器调用逻辑中**不会**为你做这些

下面是使用类装饰器（@sealed）的例子，应用在`Greeter`类：
```ts
@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return 'Hello, ' + this.greeting
  }
}
```

我们可以这样定义`@sealed`装饰器

```ts
function sealed(constructor: Function) {
  Object.seal(constructor)
  Object.seal(constructor.prototype)
}
```

当`@sealed`被执行的时候，它将密封此类的构造函数和原型。
下面是一个重构构造函数的例子。

```ts
function classDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    newProperty = 'new property'
    hello = 'override'
  }
}
@classDecorator
class Greeter {
  property = 'property';
  hello: string;
  constructor(m: string) {
    this.hello = m
  }
}

console.log(new Greeter('world'))
```

## 方法装饰器
**方法装饰器**声明在一个方法的声明之前（紧靠着方法声明）。它会被应用到方法的**属性描述符**上，可以用来监视、修改或者替换方法定义。方法装饰器不能用在声明文件（.d.ts），重载或者任何外部上下文（比如`declare`的类）中。

方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
1. 对于静态成员来说类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 成员的**属性描述符**
如果方法修饰器返回一个值，它会被用作方法的**属性描述符**

```ts
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message
  }

  @enumerable(false)
  greet() {
    return 'Hello, ' + this.greeting;
  }
}
```

我们可以用下面的函数声明来定义`@enumerable`装饰器：
```ts
function enumerable(value: boolean) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ddescriptor.enumerable = value
  }
} 
```

## 访问器装饰器
**访问器装饰器** 声明在一个访问器的声明之前。访问器装饰器应用于访问器的**属性描述符**并且可以用来监视，修改和替换一个访问器的定义。访问器装饰器不能用在声明文件中，或者任何外部上下文里
> TypeScript不允许同时装饰一个成员的`get`和`set`访问器。取而代之的是，一个成员的所有装饰的必须应用在文章顺序的第一个访问器上。这是因为，在装饰器应用于一个**属性描述符**时，它联合了`get`和`set`访问器，而不是分开声明的。

访问器装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字
3. 成员的属性描述符

如果访问器装饰器返回一个值，它会被用作方法的属性描述符

```ts
class Point {
  private _x: number;
  private _y: number;
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }
  @configurable(false)
  get x() {return this._x}

  @configurable(false)
  get y() {return this._y}
}

function configurable(value: boolean) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value
  }
}

```

### 属性装饰器
**属性装饰器**声明在一个属性声明之前（紧靠着属性声明）
属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：
1. 对于静态成员来说类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
> 注意**属性描述符**不会作为参数传入属性装饰器，这雨TS如何如何初始化属性装饰器有关。因为目前没有办法在定义一个原型对象的成员时描述一个实例属性，并且没有办法监视或修改一个属性的初始化方法。这会被忽略。因此，属性描述符只能用来监视类中是否声明了某个名字的属性

```ts
class Greeter {
  @format('Hello, %s')
  greeting: string;
  
  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    let formatString = getFormat(this, 'greeting')
    return formateString.replace('%s', this.greeting)
  }
}
```

### 参数修饰器
**参数修饰器**声明在一个参数声明之前（仅靠着参数声明）。参数装饰器应用于类构造函数或方法声明。

参数装饰器表达式会在运行时当作函数被调用，传入下列参数
1. 对于静态成员来说是类的构造函数，对于类型成员来说是类的原型对象
2. 成员的名字
3. 参数在函数参数列表中的索引

> 注意，参数装饰器只能用来监视一个方法的参数是否被传入

参数装饰器的返回值会被忽略
下列定义了参数装饰器(@required)并应用于`Greeter`类方法的一个参数：

```ts
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  @validate
  greet(@required name: string) {
    return 'Hello ' + name + ', ' + this.greeting;
  }
}
```
