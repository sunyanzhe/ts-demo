interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength?: number;
  [propName: string]: any;
}

let square = {} as Square
square.a = '100'