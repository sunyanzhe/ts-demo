interface AInter {
  a: string;
  b: string;
}
class AA implements AInter {
  protected constructor(public a: string, public b: string) {
    this.a = a;
    this.b = b
  }
}
interface BInter extends AA {
  c?: string;
  [m: string]: any; 
}
class BB extends AA implements BInter{
  public c: string
  constructor(a: string, b: string) {
    super(a, b)
    this.c = a + b
  }
}

// let aa = new AA() 报错
let bb = new BB('a', 'b')