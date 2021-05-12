function createSquare(config) {
    var result = { color: 'black', area: 0 };
    if (config.color) {
        result.color = config.color;
    }
    if (config.width) {
        result.area = config.width * config.width;
    }
    return result;
}
var mySquare = createSquare({ colour: 'red' });
