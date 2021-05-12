var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var A = /** @class */ (function () {
    function A(name) {
        this.name = name;
    }
    A.prototype.log = function () {
        console.log(this.name);
    };
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super.call(this, 'this is B Instance') || this;
    }
    return B;
}(A));
var C = /** @class */ (function () {
    function C(name) {
        this.name = name;
    }
    return C;
}());
var a = new A('this is A Instance');
var b = new B();
var c = new C('this is C Instance');
a.log();
a = b;
// a = c // 报错： A 与 C不兼容
