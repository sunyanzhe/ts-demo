function loggingIdentity<T>(arg: T):T {
  // console.log(arg.length) // Error!
  return arg
}

function loggingIdentity2<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}

function logginIdentity3<T>(arg: Array<T>): Array<T> {
  console.log(arg.length);
  return arg;
}
