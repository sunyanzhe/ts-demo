const enum Enum {
  A = 1,
  B = A * 2
}
// const编译后额外生成代码

enum Enum2 {
  X,Y,Z
}

// enum会

let arr: number[] = [Enum.A, Enum.B]