class Animal {
  constructor(private name: string) {}
  move(distance) {
    console.log(`${this.name} moved ${distance}m.`)
  }
}
