class Dep {
  static target:number = 1
  private subs:number[] = []
  depend() {
    this.subs.push(Dep.target)
  }
}