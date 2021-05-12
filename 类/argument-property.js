var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.move = function (distance) {
        console.log(this.name + " moved " + distance + "m.");
    };
    return Animal;
}());
