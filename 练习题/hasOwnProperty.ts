const obj_hasOP = {}

function print(person: object) {
  if(typeof person === 'object' 
  && Object.hasOwnProperty.call(person, 'name') 
  // yes! name now exists in person 👍
  && typeof person.name === 'string' 
  ) {
    // do something with person.name, which is a string
  }
}

function hasOwnProperty<
  Obj extends object,
  Key extends PropertyKey
> (x: Obj, y: Key): x is Obj & Record<Key, unknown> {
  return x.hasOwnProperty(y)
}

function print2(person: object) {
  if (
    typeof person === 'object'
    // person = { } & Record<'name', unknown>
    // = { } & { name: 'unknown'}
    && hasOwnProperty(person, 'name')
    && typeof person.name === 'string'
  ) {
    console.log(person.name)
  }
}