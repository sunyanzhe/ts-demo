interface SquareConfig {
  color?: string;
  width?: number;
}

interface SquareArea {
  color: string;
  area: number;
}

function createSquare(config: SquareConfig): SquareArea {
  let newSquare = { color: 'white', area: 100 }
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}