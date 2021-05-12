interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  let result = {color: 'black', area: 0}
  if (config.color) {
    result.color = config.color
  }
  if (config.width) {
    result.area = config.width * config.width
  }
  return result
}
let mySquare = createSquare({ color: 'red' })

