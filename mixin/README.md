## 理解示例
先定义了两个类，他们将作为mixins。可以看到每个类只定义了特定行为或功能。稍后我们使用它们来创建一个新类，同时具有这两种功能。


下面创建一个类，结合两个mixins。
```ts
class SmartObject {}
interface SmartObject extends Disposable, Activatable {}
```

没有在SmartObject类里面继承Disposable和Activatable，而是在SmartObject接口里面继承的。由于声明合并的存在，SmartObject接口会被混入到SmratObject类里面

他将类视为接口，且只会混入Disposable和Activaable背后的类型里，不会混入实现。也就是说，我么要在类里面去实现。这正是我们想要在混入时避免的行为

最后，我们将混入融入到类的实现中去。

```ts
isDisposed: boolean = false;
dispose: () => void;

isActive: boolean = false;
activate: () => void;
deactivate: () => void;
```

最后，把mixins混入定义的类，完成全部实现部分。
```ts
applyMixins(SmartObject, [Disposable, Activatable]);
```

最后，创建这个帮助函数，帮助我们做混入操作。它会遍历mixins上的所有属性，并复制到目标上去，把之前的占位属性替换成真正的实现代码。

```ts
function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype)
  })
}
```