
class AAnimal {
  constructor (public type: string) {}
}

class DDog extends AAnimal {
  constructor (public name: string) {
    super('dog')
    this.name = name
  }
}

class PetDog extends DDog {
  public size = 'small'
}

function checkIfAnimalsAreAwake(arr: DDog[]) {
}

let myPets: DDog[] = [new DDog('1'), new DDog('2')]
let myAn: AAnimal[] = [new AAnimal('a')]
checkIfAnimalsAreAwake(myPets)

// 协变 逆变 不变 双变
interface SuperType {
  base: string
}
interface SubType extends SuperType {
  addition: string
}

// 
let superType: SuperType = { base: 'base' }
let subType: SubType = { base: 'myBase', addition: 'myAddition' }
superType = subType
// subType = superType


// Covariant 协变
type Covariant<T> = T[]
let coSuperType: Covariant<SuperType> = []
let coSubType: Covariant<SubType> = []
coSuperType = coSubType

// Contravariant 逆变
type Contravariant<T> = (p: T) => void
let contraSuperType: Contravariant<SuperType> = function(p) {}
let contraSubType: Contravariant<SubType> = function(p) {}
contraSubType(subType)
contraSubType = contraSuperType

// Bivariant -- strictFunctionTypes false 双向协变
type Bivariant<T> = (p: T) => void
let biSuperType: Bivariant<SuperType> = (p) => {}
let biSubType: Bivariant<SubType> = (p) => {}

// biSubType = biSuperType
biSuperType = biSubType

// Invariant -- strictFunctionTypes true
type Invariant<T> = { a: Covariant<T>, b: Contravariant<T> }

let inSuperType: Invariant<SuperType> = { a: coSuperType, b: contraSuperType }
let inSubType: Invariant<SubType> = { a: coSubType, b: contraSubType }

// inSuperType = inSubType // error
// inSubType = inSuperType // error

interface Super  {
  a: string
}

interface Sub extends Super {
  b: string
}

interface Suc extends Super {
  c: string
}

type Arr<T> = T[]


let supera: Super = {
  a: 'a'
}

let subb: Sub = {
  a: 'a',
  b: 'b'
}

let succ: Suc = {
  a: 'a',
  c: 'c'
}

let arrSuperA: Arr<Super> = [supera]
let arrSubB: Arr<Sub> = [subb]

arrSuperA = arrSubB

arrSuperA.push(succ)


