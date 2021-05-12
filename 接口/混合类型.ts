interface Counter{
  (start: number): string;
  interval: number;
  reset()
}

let counter = function(a) {`${a}`} as Counter

counter.interval = 12
counter.reset = function() {}

function counterCreator(interval: number): Counter {
  let c = function(a){} as Counter
  c.interval = 123
  c.reset = function() {}
  return c
}

