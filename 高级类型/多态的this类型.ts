class BasicCalculator {
  constructor(protected value: number = 0) {}
  currentValue(): number {
    return this.value
  }
  add(num: number): this{
    this.value += num
    return this;
  }
  multiply(num: number): this {
    this.value *= num
    return this
  }
}
class ScientificCalculator extends BasicCalculator {
  constructor(value = 0){
    super(value)
  }
  sin() {
    this.value = Math.sin(this.value)
    return this
  }
}

let v = new ScientificCalculator(2).multiply(2).add(1).sin().currentValue()

let v2 = new ScientificCalculator(0).add(1).multiply(2).sin().currentValue()

