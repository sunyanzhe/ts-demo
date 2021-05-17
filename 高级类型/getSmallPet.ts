export interface Bird {
  fly(): void;
  layEggs(): void;
}

export interface Fish {
  swim(): void;
  layEggs(): void;
}

export default function getSmallPet(): Fish | Bird {
  let bird: Bird = {fly: () => undefined, layEggs: () => {}},
    fish: Fish = {swim: () => undefined, layEggs: () => {}}
  return ((Math.random() * 10) << 0) > 5
         ? bird
         : fish
}
