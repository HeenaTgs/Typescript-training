let nanValue: number = NaN;

console.log(nanValue);

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
    const res = await fetch('');
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

