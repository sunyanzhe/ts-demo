class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message
  }

  @enumerable
  greet() {
    return 'Hello, ' + this.greeting;
  }
}
function enumerable (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  descriptor.enumerable = false
}