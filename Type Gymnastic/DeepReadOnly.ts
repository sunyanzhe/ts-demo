// https://github.com/type-challenges/type-challenges/blob/master/questions/9-medium-deep-readonly/README.md
type DeepReadOnly<T> = {
  readonly [K in keyof T]: T[K] extends Record<any, any>
    ? T[K] extends Function
      ? T[K]
      : DeepReadOnly<T[K]>
    : T[K]
}

// vue-next中的DeepReadOnly
type Primitive = string | number | boolean | bigint | symbol | undefined | null
type Builtin = Primitive | Function | Date | Error | RegExp

type VueDeepReadOnly<T> = T extends Builtin
  ? T
  : T extends Map<infer K, infer V>
    ? ReadonlyMap<VueDeepReadOnly<K>, VueDeepReadOnly<V>>
    : T extends ReadonlyMap<infer K, infer V>
      ? ReadonlyMap<VueDeepReadOnly<K>, VueDeepReadOnly<V>>
      : T extends WeakMap<infer K, infer V>
        ? WeakMap<VueDeepReadOnly<K>, VueDeepReadOnly<V>>
        : T extends Set<infer U>
          ? ReadonlySet<VueDeepReadOnly<U>>
          : T extends ReadonlySet<infer U>
            ? ReadonlySet<VueDeepReadOnly<U>>
            : T extends WeakSet<infer U>
              ? WeakSet<VueDeepReadOnly<U>>
              : T extends Promise<infer U>
                ? Promise<VueDeepReadOnly<U>>
                : T extends {}
                  ? { readonly [K in keyof T]: VueDeepReadOnly<T[K]> }
                  : Readonly<T>