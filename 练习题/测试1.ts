interface Personn {
  name: string;
  age: number;
  id: number;
}

declare const me: Personn

type ObjectKeys<T> = 
  T extends object ? Array<keyof T> :
  T extends number ? [] :
  T extends any[] | string ? string[] :
  never
interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>
}
Object.keys(me).forEach(key => {
  const a = typeof key
  console.log(me[key])
})