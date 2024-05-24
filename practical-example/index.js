// In TypeScript, NaN is a valid value of type number. It is used to represent a value that is not a legal number, typically resulting from invalid operations like 0/0 or Math.sqrt(-1). The TypeScript type system allows NaN to be assigned to variables of type number.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// let nanValue: number = NaN;
// console.log(nanValue);
// if (isNaN(nanValue)) {
//     console.log("The value is NaN");
// } else {
//     console.log("The value is a number");
// }
// function isEven(a: number):boolean{
//     return a % 2 == 0
// }
// console.log(isEven(5));
// async function fetchData(): Promise<unknown> {
//     const res = await fetch('');
//     const data = await res.json();
//     return data;
// }
// async function processData() {
//     const res = await fetchData();
//     if(typeof res === 'object'){
//     }
// }
// class BankAccount {
//     private _balance: number = 0;
//     public get balance() : number {
//         return this._balance;
//     }
//     public set balance(newBalance: number){
//         if(newBalance < 0){
//             throw new Error('Invalid balance');
//         }
//         this._balance = newBalance
//     }
// }
// const account = new BankAccount();
// account.balance = 10;
// console.log(account.balance);
// class Temperature {
//     private _celcius: number = 0;
//     public get celsius() : number {
//         return this._celcius;
//     }
//     public set celsius(newCelsius: number){
//         this._celcius = newCelsius
//     }
//     public get fahrenheit() : number {
//         return (this._celcius * 9)/5 + 32;
//     }
//     public set fahrenheit(newFeh: number){
//         this._celcius = ((newFeh - 32) * 5)/9;
//     }
// }
// const temp: any = new Temperature();
// temp.celsius = 25;
// console.log(temp.fahrenheit);
// temp.fahrenheit = 77;
// console.log(temp.celsius);
var Shape = /** @class */ (function () {
    function Shape(color) {
        this.color = color;
    }
    return Shape;
}());
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(color, radius) {
        var _this = _super.call(this, color) || this;
        _this.color = color;
        _this.radius = radius;
        _this.displayArea = function () {
            console.log("This is a ".concat(_this.color, " circle with a radius of ").concat(_this.radius));
            console.log("The area is ".concat(_this.calculateArea()));
        };
        return _this;
    }
    Circle.prototype.calculateArea = function () {
        return Math.PI * this.radius * this.radius;
    };
    return Circle;
}(Shape));
var circle = new Circle("red", 5);
console.log(circle.calculateArea());
circle.displayArea();
