interface Lengthwise {
  length: number;
  [propName: string]: number;

}
const are: Lengthwise = {
  length: 100,
  value: 10
}

function loggingId<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); 
  return arg
}
loggingId({length:3, value: 10})