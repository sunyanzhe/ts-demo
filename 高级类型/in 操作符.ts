import { Fish, Bird, default as getSmallPet }  from './getSmallPet'

let pet: Fish | Bird = getSmallPet()

function move(pet: Fish | Bird) {
  if ('swim' in pet) {
    return pet.swim()
  }
  return pet.fly()
}

move(pet)