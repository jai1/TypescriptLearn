# TypescriptLearn
Link: https://www.freecodecamp.org/news/learn-typescript-beginners-guide/

Cheat Sheet: https://doabledanny.gumroad.com/l/typescript-cheat-sheet-pdf

React Cheat sheet: https://react-typescript-cheatsheet.netlify.app/docs/basic/setup

TypeScript is a superset of JavaScript, meaning that it does everything that JavaScript does, but with some added features.

The main reason for using TypeScript is to add static typing to JavaScript. Static typing means that the type of a variable cannot be changed at any point in a program. It can prevent a LOT of bugs!

On the other hand, JavaScript is a dynamically typed language, meaning variables can change type. 

TypeScript cannot be understood by browsers, so it has to be compiled into JavaScript by the TypeScript Compiler (TSC) 

## Why you should use TypeScript?
1. Readability
1. static typing allows you to catch more bugs in development phase.

### Drawbacks:
1. Takes longer to write.
1. Needs to be compiled.

## Installation
Installation requires Node. Then install the TypeScript compiler globally on your machine by running the following command:
```shell
npm i -g typescript
```
To check if the installation is successful (it will return the version number if successful):
```shell
tsc -v
```
To compile typescript to java script.
```shell
tsc index.ts --outfile file-name.js

```
If you want TSC to compile your code automatically, whenever you make a change, add the "watch" flag:
```shell
tsc --watch
```
Command to run the promise
```shell
node ./index.js
```

## How to Set Up the ts config File
The ts config file should be in the root directory of your project. In this file we can specify the root files, compiler options, and how strict we want TypeScript to be in checking our project.
First, create the ts config file:
```
tsc --init
```
You should now have a `tsconfig.json` file in the project root.

## Modules
In JavaScript, a module is  just a file containing related code. Functionality can be imported and exported between modules, keeping the code well organized.
TypeScript also supports modules. The TypeScript files will compile down into multiple JavaScript files.
In the tsconfig.json file, change the following options to support modern importing and exporting:
```typescript
 "target": "es2016",
 "module": "es2015"
```

## TypeScript strict mode
It is recommended to have all strict type-checking operations enabled in the tsconfig.json file. This will cause TypeScript to report more errors, but will help prevent many bugs from creeping into your application.

```typescript
 // tsconfig.json
 "strict": true
```


## Primitive types
In JavaScript, a primitive value is data that is not an object and has no methods. There are 7 primitive data types:

1. string
1. number
1. bigint
1. boolean
1. undefined
1. null
1. symbol
Primitives are immutable: they can't be altered. It is important not to confuse a primitive itself with a variable assigned a primitive value. The variable may be reassigned a new value, but the existing value can't be changed in the ways that objects, arrays, and functions can be altered.

We can set the type we want a variable to be by adding : type (called a "type annotation" or a "type signature") after declaring a variable.
But it's usually best to not explicitly state the type, as TypeScript automatically infers the type of a variable (type inference):
We can also set a variable to be able to be a union type. A union type is a variable that can be assigned more than one type:

```typescript
let id: number = 5;
let firstname: string = 'danny';

let unit: number; // Declare variable without assigning a value
unit = 5;

let hasDog: boolean = true; 
hasDog = 'yes'; // ERROR

let age: string | number;
age = 26;
age = 'old'; 

```

## Reference types

In **JavaScript**, almost "everything" is an object. In fact (and confusingly), strings, numbers and booleans can be objects if defined with the new keyword:
```typescript
let firstname = new String('Danny');
console.log(firstname); // String {'Danny'}
```
However, when we talk of reference types in JavaScript, we are referring to arrays, objects and functions.

### Caveat: primitive vs reference types
If a primitive type is assigned to a variable, we can think of that variable as containing the primitive value. Each primitive value is stored in a unique location in memory.
If we have two variables, x and y, and they both contain primitive data, then they are completely independent of each other:
This isn't the case with reference types. Reference types refer to a memory location where the object is stored.
```typescript
let x = 2;
let y = 1;

x = y;
y = 100;
console.log(x); // 1 (even though y changed to 100, x is still 1)

let point1 = { x: 1, y: 1 };
let point2 = point1;

point1.y = 100;
console.log(point2.y); // 100 (point1 and point2 refer to the same memory address where the point object is stored)
```

## Arrays
```typescript
let ids: number[] = [1, 2, 3, 4, 5]; // can only contain numbers
ids.push(6);
ids.push('7'); // ERROR: Argument of type 'string' is not assignable to parameter of type 'number'.

let books: object[] = [
  { name: 'Fooled by randomness', author: 'Nassim Taleb' },
  { name: 'Sapiens', author: 'Yuval Noah Harari' },
]; // can only contain objects
let arr: any[] = ['hello', 1, true, { name: 'Fooled by randomness', author: 'Nassim Taleb' }, [1]]; // any basically reverts TypeScript back into JavaScript
let person: (string | number | boolean)[] = ['Danny', 1, true];
person[0] = 100;
person[1] = {name: 'Danny'} // Error - person array can't contain objects

```
### Tuples
There is a special type of array that can be defined in TypeScript: Tuples. A tuple is an array with fixed size and known datatypes. They are stricter than regular arrays.

*Note:* the [] on the datatypes instead of ().
```typescript
let person: [string, number, boolean] = ['Danny', 1, true]; 
person[0] = 100; // Error - Value at index 0 can only be a string
```

## Objects in TypeScript
Objects in TypeScript must have all the correct properties and value types:
```typescript
// Declare a variable called person with a specific object type annotation
let person: {
  name: string;
  location: string;
  isProgrammer: boolean;
};

// Assign person to an object with all the necessary properties and value types
person = {
  name: 'Danny',
  location: 'UK',
  isProgrammer: true,
};

person.isProgrammer = 'Yes'; // ERROR: should be a boolean


person = {
  name: 'John',
  location: 'US',
}; 
// ERROR: missing the isProgrammer property
```

When defining the signature of an object, you will usually use an interface. This is useful if we need to check that multiple objects have the same specific properties and value types:
```typescript
interface Person {
  name: string;
  location: string;
  isProgrammer: boolean;
}

let person1: Person = {
  name: 'Danny',
  location: 'UK',
  isProgrammer: true,
};

let person2: Person = {
  name: 'Sarah',
  location: 'Germany',
  isProgrammer: false,
};
```

## Functions
We can also declare function properties with function signatures. We can do this using old-school common JavaScript functions (sayHi), or ES6 arrow functions (sayBye):
```typescript
interface Speech {
  sayHi(name: string): string;
  sayBye: (name: string) => string;
}

let sayStuff: Speech = {
  sayHi: function (name: string) {
    return `Hi ${name}`;
  },
  sayBye: (name: string) => `Bye ${name}`,
};

console.log(sayStuff.sayHi('Heisenberg')); // Hi Heisenberg
console.log(sayStuff.sayBye('Heisenberg')); // Bye Heisenberg
```
Notice how it isn't necessary to explicitly state that circle is a function; TypeScript infers it. TypeScript also infers the return type of the function, so it doesn't need to be stated either. Although, if the function is large, some developers like to explicitly state the return type for clarity.
```typescript
// Using explicit typing 
const circle1: Function = (diam: number): string => {
  return 'The circumference is ' + Math.PI * diam;
};

// Inferred typing - TypeScript sees that circle is a function that always returns a string, so no need to explicitly state it
const circle2 = (diam: number) => {
  return 'The circumference is ' + Math.PI * diam;
};
```


A function that returns nothing is said to return void – a complete lack of any value
```typescript
const logMessage = (msg: string): void => {
  console.log('This is the message: ' + msg);
};

logMessage('TypeScript is superb'); // This is the message: TypeScript is superb
```

### Function signature
```typescript
// Declare the varible sayHello, and give it a function signature that takes a string and returns nothing.
let sayHello: (name: string) => void;

// Define the function, satisfying its signature
sayHello = (name) => {
  console.log('Hello ' + name);
};

sayHello('Danny'); // Hello Danny
```

### Optional parameters
```typescript
const add = (a: number, b: number, c?: number | string) => {
  console.log(c);

  return a + b;
};

console.log(add(5, 4, 'I could pass a number, string, or nothing here!'));
// I could pass a number, string, or nothing here!
// 9
```
## Type Aliases
Type Aliases can reduce code duplication, keeping our code DRY (Don't Repeat yourself). Below, we can see that the PersonObject type alias has prevented repetition, and acts as a single source of truth for what data a person object should contain.
```typescript
type StringOrNumber = string | number;

type PersonObject = {
  name: string;
  id: StringOrNumber;
};

const person1: PersonObject = {
  name: 'John',
  id: 1,
};

const person2: PersonObject = {
  name: 'Delia',
  id: 2,
};

const sayHello = (person: PersonObject) => {
  return 'Hi ' + person.name;
};

const sayGoodbye = (person: PersonObject) => {
  return 'Seeya ' + person.name;
};
```
## Null check
With the non-null assertion operator (!) we can tell the compiler explicitly that an expression has value other than null or undefined. This is can be useful when the compiler cannot infer the type with certainty, but we have more information than the compiler.

## Type casting and DOM (unrelated)
TypeScript doesn't have access to the DOM like JavaScript. This means that whenever we try to access DOM elements, TypeScript is neither sure that they actually exist nor does it know the return type.
```typescript
const form = document.getElementById('signup-form');

console.log(form.method);
// ERROR: Object is possibly 'null'.
// ERROR: Property 'method' does not exist on type 'HTMLElement'.
```
FIX
```typescript
const form = document.getElementById('signup-form') as HTMLFormElement;

console.log(form.method); // post
```
And TypeScript is happy! However, at runtime form can be null.

TypeScript also has an Event object built in. So, if we add a submit event listener to our form, TypeScript will give us an error if we call any methods that aren't part of the Event object. Check out how cool TypeScript is – it can tell us when we've made a spelling mistake:

```typescript
const form = document.getElementById('signup-form') as HTMLFormElement;

form.addEventListener('submit', (e: Event) => {
e.preventDefault(); // prevents the page from refreshing

console.log(e.tarrget); // ERROR: Property 'tarrget' does not exist on type 'Event'. Did you mean 'target'?
});
```
## Interfaces
Interfaces define how an object should look:
```typescript
interface Person {
name: string;
age: number;
}

function sayHi(person: Person) {
console.log(`Hi ${person.name}`);
}

sayHi({
name: 'John',
age: 48,
}); // Hi John
```

### Types
Interfaces are very similar to type aliases, and in many cases you can use either. 
You can also define an object type using a type alias:
```typescript
type Person = {
name: string;
age: number;
};

function sayHi(person: Person) {
console.log(`Hi ${person.name}`);
}

sayHi({
name: 'John',
age: 48,
}); // Hi John

let p: PersonType = {
    name: 'John',
    age: 48,
};
```

The key distinction is that type aliases cannot be reopened to add new properties, vs an interface which is always extendable.
As a rule of thumb, the TypeScript docs recommend using interfaces to define objects, until you need to use the features of a type.

```typescript
interface Animal {
  name: string
}

// Re-opening the Animal interface to add a new field
interface Animal {
  tail: boolean
}

const dog: Animal = {
  name: "Bruce",
  tail: true,
}
```

### Anonymous object
Or an object type could be defined anonymously:
```typescript
function sayHi(person: { name: string; age: number }) {
console.log(`Hi ${person.name}`);
}

sayHi({
name: 'John',
age: 48,
}); // Hi John

```

## Classes
readonly, private, public, protected are all access modifiers.
Note that if we omit the access modifier, by default the property will be public.
Access modifiers can't be modified during extension or implementation.
Classes can also be extended, just like in regular JavaScript:
*Note:* Like in Java, when the class is extended the base class constructor needs to be called (super).
```typescript
interface PersonInterface {
    sayMyName: () => void;
}

class Person implements PersonInterface {
  readonly name: string; // This property is immutable - it can only be read
  private isCool: boolean; // Can only access or modify from methods within this class
  protected email: string; // Can access or modify from this class and subclasses
  public pets: number; // Can access or modify from anywhere - including outside the class

  constructor(n: string, c: boolean, e: string, p: number) {
    this.name = n;
    this.isCool = c;
    this.email = e;
    this.pets = p;
  }

  sayMyName() {
    console.log(`Your not Heisenberg, you're ${this.name}`);
  }
}

class Programmer extends Person {
    programmingLanguages: string[];

    constructor(
        name: string,
        isCool: boolean,
        email: string,
        pets: number,
        pL: string[]
    ) {
        // The super call must supply all parameters for base (Person) class, as the constructor is not inherited.
        super(name, isCool, email, pets);
        this.programmingLanguages = pL;
    }
}

const person1 = new Person('Danny', false, 'dan@e.com', 1);
const person2 = new Person('Sarah', 'yes', 6); // ERROR: Argument of type 'string' is not assignable to parameter of type 'boolean'.
let programmer1: Programmer = new Programmer('Jai', true, '', 0, []);
let People: Person[] = [person1, programmer1];

console.log(person1.name); // Fine
person1.name = 'James'; // Error: read only
console.log(person1.isCool); // Error: private property - only accessible within Person class
console.log(person1.email); // Error: protected property - only accessible within Person class and its subclasses
console.log(person1.pets); // Public property - so no problem

```

We can make our code more concise by constructing class properties this way. Here, the properties are automatically assigned in the constructor – saving us from having to write them all out.


```typescript
class Person {
  constructor(
    readonly name: string,
    private isCool: boolean,
    protected email: string,
    public pets: number
  ) {}

  sayMyName() {
    console.log(`Your not Heisenberg, you're ${this.name}`);
  }
}

const person1 = new Person('Danny', false, 'dan@e.com', 1);
console.log(person1.name); // Danny
```

## Literal types in TypeScript
In addition to the general types string and number, we can refer to specific strings and numbers in type positions:


```typescript
// Union type with a literal type in each position
let favouriteColor: 'red' | 'blue' | 'green' | 'yellow';

favouriteColor = 'blue';
favouriteColor = 'crimson'; // ERROR: Type '"crimson"' is not assignable to type '"red" | "blue" | "green" | "yellow"'.
```

## Generics
Generics allow you to create a component that can work over a variety of types, rather than a single one, which helps to make the component more reusable.
Here the addId function is returning a new anonymous object. `...`
Generics allow you to have type-safety in components where the arguments and return types are unknown ahead of time.

```typescript
// <T> is just the convention - e.g. we could use <X> or <A>
const addID = <T>(obj: T) => {
  let id = Math.floor(Math.random() * 1000);

  return { ...obj, id };
};
let person1 = addID({ name: 'John', age: 40 });
let person2 = addID(['Sally', 26]); // Pass in an array - no problem
console.log(person1.id);  
console.log(person2.id); 

// This restricts the object to have a value property
const add10 = <T extends { value: number }>(obj: T) => {
    obj.value += 10;
    return obj;
};

console.log(add10({name: 'Jai', value: 200})); 
```
 ### Generics with interface
```typescript
// The type, T, will be passed in
interface Person<T> {
  name: string;
  age: number;
  documents: T;
}

// We have to pass in the type of `documents` - an array of strings in this case
const person1: Person<string[]> = {
  name: 'John',
  age: 48,
  documents: ['passport', 'bank statement', 'visa'],
};

// Again, we implement the `Person` interface, and pass in the type for documents - in this case a string
const person2: Person<string> = {
  name: 'Delia',
  age: 46,
  documents: 'passport, P45',
};
```

## Enums
Enums are a special feature that TypeScript brings to JavaScript. Enums allow us to define or declare a collection of related values, that can be numbers or strings, as a set of named constants.
By default, enums are number based – they store string values as numbers. But they can also be strings:
```typescript
enum ResourceType {
  BOOK,
  AUTHOR,
  FILM,
  DIRECTOR,
  PERSON,
}

console.log(ResourceType.BOOK); // 0
console.log(ResourceType.AUTHOR); // 1

// To start from 1
enum ResourceType {
  BOOK = 1,
  AUTHOR,
  FILM,
  DIRECTOR,
  PERSON,
}

console.log(ResourceType.BOOK); // 1
console.log(ResourceType.AUTHOR); // 2

enum Direction {
    Up = 'Up',
    Right = 'Right',
    Down = 'Down',
    Left = 'Left',
}

console.log(Direction.Right); // Right
console.log(Direction.Down); // Down
```

## Narrowing in TS
In a TypeScript program, a variable can move from a less precise type to a more precise type. This process is called type narrowing.

Here's a simple example showing how TypeScript narrows down the less specific type of string | number to more specific types when we use if-statements with typeof:

```typescript
function addAnother(val: string | number) {
  if (typeof val === 'string') {
    // TypeScript treats `val` as a string in this block, so we can use string methods on `val` and TypeScript won't shout at us
    return val.concat(' ' + val);
  }

  // TypeScript knows `val` is a number here
  return val + val;
}

console.log(addAnother('Woooo')); // Woooo Woooo
console.log(addAnother(20)); // 40

```

Typescript can also use class properties to narrow down the type of variable

```typescript
// All trains must now have a type property equal to 'Train'
interface Train extends Vehicle {
  type: 'Train';
  carriages: number;
}

// All trains must now have a type property equal to 'Plane'
interface Plane extends Vehicle {
  type: 'Plane';
  wingSpan: number;
}

type PlaneOrTrain = Plane | Train;

function getSpeedRatio(v: PlaneOrTrain) {
    if (v.type === 'Train') {
        // TypeScript now knows that `v` is definitely a `Train`. It has narrowed down the type from the less specific `Plane | Train` type, into the more specific `Train` type
        return v.topSpeed / v.carriages;
    }

    // If it's not a Train, TypeScript narrows down that `v` must be a Plane - smart!
    return v.topSpeed / v.wingSpan;
}

let bigTrain: Train = {
    type: 'Train',
    topSpeed: 100,
    carriages: 20,
};

console.log(getSpeedRatio(bigTrain)); // 5
```

## TypeScript in React

### React props with TypeScript
Below, we are saying that Person should be a React functional component that accepts a props object with the props name, which should be a string, and age, which should be a number.

```typescript
// src/components/Person.tsx
import React from 'react';

const Person: React.FC<{
  name: string;
  age: number;
}> = ({ name, age }) => {
  return (
    <div>
      <div>{name}</div>
      <div>{age}</div>
    </div>
  );
};

export default Person;
```

Here are a few examples for what we could have as prop types:

```typescript
interface PersonInfo {
  name: string;
  age: number;
}

interface Props {
  text: string;
  id: number;
  isVeryNice?: boolean;
  func: (name: string) => string;
  personInfo: PersonInfo;
}
```

### React hooks with TypeScript

useState()
We can declare what types a state variable should be by using angle brackets. Below, if we omitted the angle brackets, TypeScript would infer that cash is a number. So, if want to enable it to also be null, we have to specify:

```typescript
const Person: React.FC<Props> = ({ name, age }) => {
  const [cash, setCash] = useState<number | null>(1);

  setCash(null);

  return (
    <div>
      <div>{name}</div>
      <div>{age}</div>
    </div>
  );
};
```

useRef()
useRef returns a mutable object that persists for the lifetime of the component. We can tell TypeScript what the ref object should refer to – below we say the prop should be a HTMLInputElement:

```typescript
const Person: React.FC = () => {
// Initialise .current property to null
const inputRef = useRef<HTMLInputElement>(null);

return (
<div>
<input type='text' ref={inputRef} />
</div>
);
};
```

## Promises in Typescript
The primary objective behind promises is to introduce synchronous error handling to Async / Callback programmes.

A Promise is in one of the following states:

1. pending: in its preliminary form, neither fulfilled nor rejected.
1. fulfilled: denotes that the operation was successfully finished.
1. rejected: indicates that the procedure was unsuccessful.

### Syntax:

```typescript
const one_promise = new Promise<number>
((resolve, reject) => {
    resolve(50);
    // reject(new Error('failed')); // Always reject a promise with error
});
```

Resolve: You can resolve a promise with the same data type as the generic used to create the promise.
Reject: You can reject a promise with "any" data type. However, the best practice is always to reject a promise with.

### Subscribing to the fate of the Typescript promise

```typescript
one_promise.then(value => {
    console.log('resolved', value);
}).catch(error => {
    console.log('rejected', error);
}).finally (()=> {
    console.log ('Completed!' );
});
```

### Chain-ability of Typescript Promises
```typescript
const RandomInt= (): string => {
    return (Math.random ()* 10).toFixed(0);
};

const find_even = new Promise <number> ((resolve, reject) => {
        setTimeout( function(): void {
            const value = parseInt(RandomInt());
            if (value % 2 == 0) {
                resolve(value);
            } else {
                reject ('Odd number found!');
            }
        }, 1000);
    });

find_even.then ((value) => {
    console.log ('Resloved-1:', value + 1 );
    return `${value +1}`; // Convert value to string
}).then ((value) => {
    console.log ('Resloved-2:', value + 1 ); // concatenation occurs here
}).catch ((error ) => {
    console.log ('Rejected:', error );
}).finally (()=> {
    console.log ('Completed!' );
});
```

### Promise functions
1. Promise.reject(new Error("Blah!"))
1. Promise.resolve(value)
1. Promise.all([ v1, v2, ... ])
1. Promise.allSettled


```typescript
 const numberPromise = Promise.resolve(value); // immediately resolve the promise and return some value
 const error = Promise.reject(new Error("Blah!")); // immediately error out the promise
```

```typescript
const goPromise = (
    value: number, delay: number, fail: boolean
): Promise<number> =>{
    return new Promise <number> ((resolve, reject) => {
        setTimeout(
            ()=> fail? reject(value) : resolve(value), delay
        );
    });
};

const totalPromise = Promise.all<number>(
    [
        goPromise(0, 0, false),
        goPromise(1, 4000, false), // turn to true to see rejected
        goPromise(2, 2000, false),
    ]);

console.time('settled-in');
totalPromise.then((value) => {
    console.log('Resolved:', value);
} ).catch( ( Error )  => {
    console.log('Rejected:', Error);
} ).finally(()=> {
    console.timeEnd('settled-in');
});
```
*Note:* 
1. Promise.all waits for all the promises are fulfilled (which means until they are resolved or rejected). 
1. If "all" promises succeed then it returns an array of values.
1. If either one of the promises is rejected then the over all promise is rejected. 

`Promise.allsettled` is similar to `Promise.all` except that it returns a Promise of array of struct containing status and value. 
Hence, the promise returned by this function always succeeds and doesn't require a catch statement.

## Async and await

async/await is essentially a syntactic sugar for promises, which is to say the async/await keyword is a wrapper over promises. 
An async function always returns a promise. 
Even if you omit the Promise keyword, the compiler will wrap your function in an immediately resolved promise.

```typescript
// Before
const begin = (callback: (a: string) => void) => {
    setTimeout(() => {
        callback('Hi');
        setTimeout(() => {
            callback('We Welcome you');
            setTimeout(() => {
                callback('Doing Async Await Using TypeScript');
            }, 100);
        }, 100);
    }, 100);
};

begin((text: string) => console.log(text));

// After
const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

const beginAsyncAgain = async (callback: (a: string) => void) => {
    try {
        await wait(1000);
        callback('Hi');
        await wait(1000);
        callback('We Welcome you');
        await wait(1000);
        callback('Doing Async Await Using TypeScript');
    } catch (ex) {
        console.log("New error thrown", ex)
    }
};

beginAsyncAgain(text => console.log(text));
```

*Note:* In case the promise we are awaiting on is rejected, an exception is thrown. Hence always wrap an await with try catch.  

