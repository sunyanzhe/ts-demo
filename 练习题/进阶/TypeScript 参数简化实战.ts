/**
 * distribute({
      type: 'LOGIN',
      email: string
  })

  转变成
  
  distribute('LOGIN', {
      email: string
  })
 */

// 首先，先来个联合类型
type UnionAction = 
  | {
    type: 'INIT'
  }
  | {
    type: 'SYNC'
  }
  | {
    type: 'LOG_IN',
    emialAddress: string
  }
  | {
    type: 'LOG_IN-SUCCESS',
    accessToken: string
  }

declare function dispatch(action: UnionAction): void

dispatch({ type: 'INIT' }) // ok 
dispatch({ type: 'LOG_IN', emialAddress: '15900313259@163.com' }) // ok

// 破费，可以

type ActionKey = UnionAction['type']

type ExtractAction<A, K> = A extends { type: K } ? A : never

type ExcludeTypeField<A> = { [K in Exclude<keyof A, 'type'>]: A[K] }

type Test = ExcludeTypeField<{type: 'LOG_IN', aa: string}> // { aa: string }

type ExtractActionParameterWithoutType<A, K> = 
  ExcludeTypeField<ExtractAction<A, K>>


declare function dispatch2<T extends ActionKey>(
  type: T,
  args: ExtractActionParameterWithoutType<UnionAction, T>
): void


// 看着还ok 但实际上有一些问题
dispatch2('LOG_IN', {emialAddress: 'sunyanzhe@github.com'})

// 比如这种, 明明没有数据了，但是还是要搞个空对象
dispatch2('INIT', {})

// 怎么把它清掉呢
// 使用重载
declare function dispatch3<T extends SimpleActionType>(type: T): void
declare function dispatch3<T extends ComplexActionType>(
  type: T,
  args: ExtractActionParameterWithoutType<UnionAction, T>
)

// 关键是如何定义这两个Type
type ExtractSimpleAction<T> = 
  T extends any 
    ? {} extends ExcludeTypeField<T>
      ? T
      : never
    : never

// 完成！
type SimpleAction = ExtractSimpleAction<UnionAction>
type SimpleActionType = SimpleAction['type']
type ComplexActionType = Exclude<ActionKey, SimpleActionType>

// ok
dispatch3('LOG_IN', {emialAddress: 'sunyanzhe@github.com'})

// 破费！
dispatch3('INIT')
