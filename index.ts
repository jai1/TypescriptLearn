let sport = 'football';

let id = 5;

let arr: any[] = ['hello', 1, true, { name: 'Fooled by randomness', author: 'Nassim Taleb' }, [1]]

console.log(arr);

/*
const form = document.getElementById('signup-form') as HTMLFormElement;

console.log(form.method); // post
*/

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

let person: Person = new Person('Jai', true, '', 0);
let programmer: Person = new Programmer('Jai', true, '', 0, []);
let people: Person[] = [person, programmer];
person.sayMyName();
programmer.sayMyName();
people.forEach(p => p.sayMyName());

const add10 = <T extends { value: number }>(obj: T) => {
    obj.value += 10;
    return obj;
};

console.log(add10({name: 'Jai', value: 200}));


const one_promise = new Promise<number>
((resolve, reject) => {
    resolve(50);
});

one_promise.then(value => {
    console.log('resolved', value);
});

const two_promise = new Promise<number>
((resolve, reject) => {
    reject(new Error('failed')); // Always reject a promise with error
});

two_promise.catch(error => {
    console.log('rejected', error);
});



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
        goPromise(1, 4000, true),
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

const totalSettledPromise = Promise.allSettled<number>(
    [
        goPromise(0, 0, false),
        goPromise(1, 4000, true),
        goPromise(2, 2000, false),
    ]);

console.time('settled-in');
totalSettledPromise.then((results) => results.forEach((result) => console.log(result)));

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

beginAsyncAgain(text => {throw new Error(text)});
