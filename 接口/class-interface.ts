interface ClockConstructor {
  new (hour: number, minute: number);
}

interface ClockInterface {
  tick()
}

function createClock(ctor: ClockConstructor, hour: number, minute): ClockInterface {
  return new ctor(hour, minute)
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {console.log('beep beep')}
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log('tik tok')
  }
}

let digital = createClock(DigitalClock, 12, 17)
let analog = createClock(AnalogClock, 7, 32)