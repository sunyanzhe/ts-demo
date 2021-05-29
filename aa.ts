import Vue from 'vue'
Vue.compile('<div></div>')

class W {
  constructor(public name: string) {}
}


type StringtoTuple<S extends string, D extends string = ''> = 
  string extends S ? string[] :
  S extends '' ? [] :
  S extends `${infer P}${D}${infer U}` ? [P, ...StringtoTuple<U, D>] :
  [S]

type FirstTuple<T extends any[]> = T extends [infer P, ...any[]] ? P : never 

type FirstChar<T extends string> = FirstTuple<StringtoTuple<T>>
type foo = StringtoTuple<'abc'>


type StringToTuple<S extends string> = 
  string extends S ? string[] :
  S extends '' ? never :
  S extends `${infer T}${infer M}` ? [T, ...StringToTuple<M>] :
  [S];

type LastTupleItem<T extends any[]> = T extends [...any[], infer L] ? L : never

type LastChar<T extends string> = LastTupleItem<StringToTuple<T>>

export { W as M }

