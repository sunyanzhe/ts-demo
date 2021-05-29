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
