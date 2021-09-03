// https://github.com/type-challenges/type-challenges/blob/master/questions/213-hard-vue-basic-props/README.md

type PropConstructor<T> = {new (): T & object} | {(): T}
type PropType<T> = PropConstructor<T> | PropConstructor<T>[]
type Prop<T> = { type: PropType<T> } | PropType<T>

