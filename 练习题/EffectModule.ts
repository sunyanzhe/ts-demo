interface Action<T> {
  payload?: T;
  type: string;
}

interface EffectModule {
  count: number
  message: string
  asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>
  syncMethod<T, U>(action: Action<T>): Action<U>
}

interface ResultModule {
  asyncMethod<T, U>(input: T): Action<U>
  syncMethod<T, U>(action: T): Action<U>
}

type GetFunctionKeys<T> = {
  [key in keyof T]: T[key] extends Function ? key : never
}[keyof T]

type FunctionMoudle = Pick<EffectModule, GetFunctionKeys<EffectModule>>

type UnWarpAction<T> = T extends Action<infer P> ? P : T
type UnWarpPromise<T> = T extends Promise<infer P> ? P : T

type MapTypeToUnPromisifyAndUnAction<T extends any[]> = {
  [key in keyof T]: T[key]
}

type aa = MapTypeToUnPromisifyAndUnAction<[1,2,3,'a']>[number]

type Connect = (o: EffectModule) => ({
  [key in GetFunctionKeys<typeof o>]: ([...args]: MapTypeToUnPromisifyAndUnAction<Parameters<EffectModule[key]>>) => UnWarpAction<UnWarpPromise<ReturnType<EffectModule[key]>>>
})
