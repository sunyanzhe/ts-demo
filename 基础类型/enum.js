var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var indexRed = Color.Green;
var colorName = Color[2];
console.log(indexRed);
console.log(colorName);
