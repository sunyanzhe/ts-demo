# 类

## 例子

```ts
class Gretter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter('world')
```

## 继承
在TS里，我们可以使用常用的面向对象模式。基于类的程序设计中一种最基本的模式时允许使用继承来扩展现有的类

看下面的例子：

```ts
class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`)
  }
}

class Dog extends Animal {
  bark() {
    console.log('Woof')
  }
}
const dog = new Dog()
dog.bark();
dog.move(10);
dog.bark();
```

下面为更复杂的例子
```ts
class Animal {
  name: string;
  constructor(theName: string) { 
    this.name = theName
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`)
  }
}

class Snake extends Animal {
  constructor(name: string) {super(name);}
  move(distanceInMeters = 5) {
    console.log('Slithering...')
    super.move(distanceInMeters)
  }
}

class Horse extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 45) {
    console.log('Galloping...');
    super.move(distanceInMeters);
  }
}
```

这个例子展示了一些上面没有提到的特性，这一次，我们使用`extends`关键字创建了`Animal`的两个子类：`Horse`和`Snake`

与前一个例子不同点是，派生类包含了一个构造函数，他必须调用super()，它会执行基类的构造函数。而且，在构造函数里访问`this`的属性之前，我们一定要调用super()。这个是TS强制执行的一条重要规则

这个例子演示了如何在子类里可以重写父类的方法。`Snake`类和`Horse`类都创建了`move`方法，他们重写了从`Animal`继承来的`move`方法，使得`move`方法根据不同的类而具有不同的功能。注意，即使`tom`被声明为`Animal`类型，但它的值是`Horse`，调用`tom.move(34)`时，他会调用`Horse`里重写的方法

## 公共，私有与受保护的修饰符

### 默认为public

在上面的例子里，我们可以自由地访问程序里定义的成员。如果你对其他语言中的类比较了解。就会注意到我们在之前的代码里并没有使用`public`来做修饰；例如，C#要求必须明确使用`publick`指定成员是可见的。在TS里，成员都默认为`public`

你也可以明确的将一个成员标记成`public`。我们可以用下面的方式来重写上面的`Animal`类：
```ts
class Animal {
  public name: string;
  public constructor(theName: string) {this.name = theName;}
  public move(distanceInMeters: number) {
    console.log(`${this.name} move ${distanceInMetters}m`)
  }
}
```

### 理解private

当成员被标记成private时，他就不能在声明它的类的外部访问。
```ts
class Animal {
  private name: string;
  constructor(theName: string) {this.name = theName;}
}

new Animal('Cat').name // 错误：'name'是私有的
```

当我们比较带有`private`或`protected`成员的类型的时候，情况就不同了。如果其中一个类型里包含一个`private`成员，那么只有当另外一个类型也存在这样一个`private`成员，并且他们都是来自同一处声明时，我们才认为这两个类型是兼容的。对于`protected`成员也使用这个规则
下面来看一个例子，更好的说明了这一点
```ts
class Animal {
  private name: string;
  constructor(theName: string) { this.name = theName }
}

class Rhino extends Animal {
  constructor() { super("Rhino"); }
}

class Employee {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}

let animal = new Animal('Goat');
let rhino = new Rhino()
let employee = new Employee('Bob')

animal = rhion;
animal = employee; // 错误： Animal 与 Employee不兼容
```


### 理解protected
`protected`修饰符与`private`修饰符行为很相似，但有一点不同的是，`protected`成员在派生类中仍然可以访问。例如：
```ts
class Person {
  protected name: string;
  constructor(name: string) {this.name = name}
}

class Employee extends Person {
  private department: string;
  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }
  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee('Howard', 'Sales')
console.log(howard.getElevatorPitch());
console.log(howard.name); // 错误
```

构造函数也可以标记为`protected`。这意味着这个类不能在包含它的类外被实例化，但是能被继承。比如
```ts
class Person {
  protected name: string;
  protected constructor(theName: string) { this.name = theName; }
}
// Employee 能够继承Person
class Employee extends Person {
  private department: string;
  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }
  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`
  }
}

let howard = new Employee('Howard', 'Sales')
let john = new Person('John')  // 错误： Person的构造函数是被保护的
```

## readonly修饰符
使用`readonly`关键字将属性设置为只读。只读属性必须在声明时或构造函数里被初始化
```ts
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;
  constructor(theName: string) {
    this.name = theName
  } 
}
let dad = new Octopus("Man with the 8 strong legs")
dad.name = "Man with the 3-piece suit" // 报错； name是只读

```

## 参数属性
参数属性可以方便的让我们在一个地方定义并初始化一个成员
下面是对之前Animal类的修改版，使用了参数属性
```ts
class Animal {
  constructor(private name: string) {}
  move(distanceInMeters: number) {
    console.log(`${this.name} move ${distanceInMeters}m`)
  }
}

```
参数属性通过给构造函数添加一个访问限定符来声明。使用private限定一个参数属性会声明并初始化一个私有成员；对于`public`和`protected`来说也是一样。

## 存取器
TS支持通过getters/setters来截取对对象成员的方你问。它能帮助你有效的控制对对象成员的访问。

```ts
class Employee {
  fullName: string;
}
let employee = new Employee()
employee.fullName = 'Bob Smith'
if (employee.fullName) {
  console.log(employee.fullName);
}
```

允许随意设置`fullName`虽然方便，但是我们仍想在设置`fullName`强制执行某些约束。

在这个版本里我们添加一个setter来检查newName的长度。以确保他满足数据库字段的最大长度录制。若它不满足，那我们就抛出一个错误来告诉客户端出错了。

为保留原有的功能，我们同时添加一个`getter`来读取`fullName`

```ts
const fullNameMaxLength = 10;
class Employee {
  private _fullName: string;
  get fullName(): string {
    return this._fullName;
  }
  set fullName(newName: string) {
    if (newName && newName.length > fullNameMaxLength) {
      throw new Error('fullName has a max length of ' + fullNameMaxLength)
    }
    this._fullName = newName;
  }
}

let employee = new Employee()
employee.fullName = 'Bob Smith'
if (employee.fullName) {
  console.log(employee.fullName);
}

```
## 静态属性
除了类的实例成员。我们还可以创建类的静态成员，这些属性存在于类本身上面而不是类的实例上。如同在实例属性上使用`this.`前缀来访问属性一样，静态属性使用类名来访问

```ts
class Grid {
  static origin = {x: 0, y: 0};
  calculateDistanceFromOrigin(point: { x: number; y: number }) {
    let xDist = (point.x - Grid.origin.x);
    let yDist = (point.y - Grid.origin.y);
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor(public scale: number) { }
}

let grid1 = new Grid(1.0)
let grid2 = new Grid(5.0)
```

## 抽象类
抽象类作为其他派生类的基类使用。他们一般不会直接实例化。不同于接口，抽象类可以包含成员的细节实现（抽象类中除抽象函数之外，其他函数可以包含具体实现）。`abstract`关键字是用于定义抽象类和抽象类内部定义抽象方法。

```ts
abstract class Animal {
  abstract makeSound(): void;
  move(): void {
    console.log('roaming the earth...')
  }
}
```

抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。抽象方法的语法与接口方法相似。两者都是定义方法签名但不包含方法体。然而，抽象方法必须包含`abstract`关键字并且可以包含访问修饰符。

```ts
abstract class Department {
  constructor(public name: string) {}
  printName():void {
    console.log('Department name: ') + this.name
  }
  abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {
  constructor() {
    super('Accounting and Auditing')
  }
  printMeeting(): void {
    console.log('The Account Department meets each Monday at 10a.m.')
  }
  generateReports(): void {
    console.log('Generating accounting reports...')
  }
}

let department: Department;
department = new Department; // 错误：不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
department.generateReports(); // 错误
```

## 构造函数
```ts
class Greeter {
  static standardGreeting = "Hello, there"
  greeting: string;
  greet() {
    if (this.greeting) {
      return "Hello, " + this.greeting;
    } else {
      return Greeter.standardGreeting
    }
  }
}
let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet())

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey, there"

let greeter2: Greeter = new greeterMaker()
console.log(greeter2.greet())
```

我们使用`typeof Greeter`意思是取Greeter类的类型，而不是实例的类型。或者更确切的说：告诉我`Greeter`标识符的类型，也就是构造函数的类型。这个类型包含了类的所有静态成员和构造函数。之后，就和前面一样，我们在greeterMaker使用new，创建了Greeter的实例

## 把类当作接口
```ts
class Point {
  x: number;
  y: number;
}
interface Point3d extends Point {
  z: number
}
let point3d: Point3d = {x:1, y:2, z:3}
```