let nanValue: number = NaN;

if (isNaN(nanValue)) {
    console.log("The value is NaN");
} else {
    console.log("The value is a number");
}


function isEven(a: number):boolean{
    return a % 2 == 0
}

console.log(isEven(5));


async function fetchData(): Promise<unknown> {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    return data;
}

async function processData() {
    const res = await fetchData();
    if(typeof res === 'object'){

    }
}


class BankAccount {
    private _balance: number = 0;

    public get balance() : number {
        return this._balance;
    }

    public set balance(newBalance: number){
        if(newBalance < 0){
            throw new Error('Invalid balance');
        }
        this._balance = newBalance
    }
}

const account = new BankAccount();
account.balance = 10;
console.log(account.balance);

class Temperature {
    private _celcius: number = 0;

    public get celsius() : number {
        return this._celcius;
    }

    public set celsius(newCelsius: number){
        this._celcius = newCelsius
    }

    public get fahrenheit() : number {
        return (this._celcius * 9)/5 + 32;
    }

    public set fahrenheit(newFeh: number){
        this._celcius = ((newFeh - 32) * 5)/9;
    }
}

const temp: any = new Temperature();
temp.celsius = 25;
console.log(temp.fahrenheit);

temp.fahrenheit = 77;
console.log(temp.celsius);

// Abstract Class
abstract class Shape {
    constructor(protected color: string) {}

    abstract calculateArea(): number;
    abstract displayArea: () => void;
}

class Circle extends Shape {
    constructor(protected color: string, protected radius: number) {
        super(color);
    }

    public calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    displayArea: () => void = (): void => {
        console.log(`This is a ${this.color} circle with a radius of ${this.radius}`);
        console.log(`The area is ${this.calculateArea()}`);
    };
}

const circle = new Circle("red", 5);
console.log(circle.calculateArea());
circle.displayArea();

// Intersection
class Person {
    constructor(public name: string, public age: number) { }
}

class Employee {
    constructor(public employeeId: number, public department: string) { }
}

type EmployeePerson = Person & Employee;

const person = new Person("abc", 25);
const employee = new Employee(1234, "Marketing");

const combined: EmployeePerson = { ...person, ...employee };

console.log(combined);


// Type Guard
// 1. typeof
function printValue(value: string | number): void {
    if (typeof value === 'string') {
        console.log(`String value: ${value.toUpperCase()}`);
    } else {
        console.log(`Number value: ${value.toFixed(2)}`);
    }
}

printValue("hello");
printValue(42);

// 2. instanceof
class Dog {
    bark() {
        console.log('Woof!');
    }
}

class Cat {
    meow() {
        console.log('Meow!');
    }
}

function makeSound(animal: Dog | Cat): void {
    if (animal instanceof Dog) {
        animal.bark();
    } else {
        animal.meow();
    }
}

const myDog = new Dog();
const myCat = new Cat();

makeSound(myDog);
makeSound(myCat);


// 3. Uninon
interface Square {
    kind: 'square';
    size: number;
}

interface Rect {
    kind: 'rectangle';
    width: number;
    height: number;
}

interface Cir {
    kind: 'circle';
    r: number;
}

type Shapes = Square | Rect | Cir;

function area(shape: Shapes): number {
    switch (shape.kind) {
        case 'square':
            return shape.size * shape.size;
        case 'rectangle':
            return shape.width * shape.height;
        case 'circle':
            return Math.PI * shape.r * shape.r;
        default:
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}

const Square: Square = { kind: 'square', size: 10 };
const Rectangle: Rect = { kind: 'rectangle', width: 5, height: 10 };
const Cir: Cir = { kind: 'circle', r: 7 };

console.log(area(Square));
console.log(area(Rectangle));
console.log(area(Cir));

// Generic Typescripting
// 1. Generic Functions
function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("Hello, Generics!");
let output2 = identity<number>(123);

// 2. Generic classes
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let genericNumber = new GenericNumber<number>();
genericNumber.zeroValue = 0;
genericNumber.add = function (x, y) {
    return x + y;
};

let genericString = new GenericNumber<string>();
genericString.zeroValue = "";
genericString.add = function (x, y) {
    return x + y;
};


// 3. Generic constraints
interface Lengthwise {
    length: number;
}

function genericFunction<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

genericFunction({ length: 10, value: 3 });

