let storage = {
  maxNumber: 99
}

Object.defineProperty(storage, 'number', {
  configurable: true,
  writable: true,
  enumerable: true,
  value: 10,
})

storage.number = 11
// error number不属于storage
// 原因：Ts不知道Object.defineProperty的赋值

function defineProperty<
  Obj extends object,
  Key extends PropertyKey,
  PDesc extends PropertyDescriptor
> (obj: Obj, prop: Key, val: PDesc):
  asserts obj is Obj & DefineProperty<Key, PDesc> {
  Object.defineProperty(obj, prop, val)
}

type DefineProperty<
  Prop extends PropertyKey,
  Desc extends PropertyDescriptor> =
    Desc extends { writable: any, set(val: any): any } ? never :
    Desc extends { writable: any, get(): any } ? never : 
    Desc extends { writable: false } ? Readonly<InferValue<Prop, Desc>> :
    Desc extends { writable: true } ? InferValue<Prop, Desc> :
    Readonly<InferValue<Prop, Desc>>

type InferValue<
  Prop extends PropertyKey,
  Desc extends PropertyDescriptor> =
    Desc extends { value: any, get(): any } ? never :
    Desc extends { value: infer T } ? Record<Prop, T> :
    Desc extends { get(): infer T } ? Record<Prop, T> : never

const storage2 = {
  maxValue: 10,
}

defineProperty(storage2, 'number', {value: 10, writable: true})

storage2.number