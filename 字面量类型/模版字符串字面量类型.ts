type PropEventSource<T> = {
  on(
    eventName: `${string & keyof T}Changed`,
    callback: (newValue: any) => void
  ): void;
};

declare function makeWatchedObject<T>(obj: T): T & PropEventSource<T>

const person = makeWatchedObject({
  firstName: 'Sun',
  lastName: 'yanzhe',
  age: 26
})

person.on('firstNameChanged', () => {})

// 拼写错误
person.on('firstName', () => {}); // error

type BaseToy = {
  name: string,
  price: number,
}
type GameToy = BaseToy & {
  kind: 'game'
}
type VideoToy = BaseToy & {
  kind: 'video'
}
type Toy = GameToy | VideoToy
type ToyKind = Toy['kind']


type GetKind<Group, Kind> = Extract<Group, {kind: Kind}>

type GroupToy = {
  [key in ToyKind as `${key}s`]: GetKind<Toy, key>
}

