### Installing Typescript compiler:
- `sudo npm i -g typescript ts-node`
- We get a `tsc` CLI, a typescript compiler
- The command `tsc` compiles typescript code into plain Javascript
  - `tsc index.ts`
  - We get back a JS file: index.js
  - Run `node index.js` to execute the JS file
- The command `ts-node` combines the commands `tsc index.ts` and `node index.js` into one. It compiles the typescript code and automatically executes the resulting javascript code
  - `ts-node index.ts`

## Syntax + Features
- Understand basic types in TS
- Function typing + annotations
- Type definition files
- Arrays in TS
- Modules systems
- Class + refresher on OOP

### TYPES

#### Type: definition
- Easy way to refer to the different properties and functions that a value has
- A value is anything that can be assign to a variable
  - Strings, numbers, booleans, null, undefined, objects, functions, classes, arrays
- So a value has a type. Every value that we create has a type assign to it
- Type in TS is a shortcuts for describing the different properties and methods that a single value has
- Every single value in TS has a type

#### Type: examples
- Type: string :: Values that have this type: 'hi there', "", 'Today is Monday'
- Type: number :: Values of this type: .0000025, -20, 40000
- Type: boolean :: Values of this type: true, false
- Type: Date :: Value of this type: new Date()
- Type: Todo :: {id: 1, completed: true, title: 'Trash'}

#### Type: 2 categories
1. Primitive types
  - number, boolean, void, undefined, string, symbol, null
  - Immutable
2. Object types
  - functions, classes, arrays, objects
  - Created by the programmer

#### Type: why do we care?
- Types are used by the Typescript Compiler to analyze our code for errors
- Types allow other engineers to understand what values are flowing around our codebase


### TYPE ANNOTATIONS + TYPE INFERENCE

#### Type annotations: definition
- Code we add to tell Typescript what type of value a variable will refer to
- We (developers) tell Typescript the type

#### Type inference: definition
- Typescript tries to figure out what type of value a variable refers to
- Typescript guesses the type

#### Type annotations: annotations with variables
```ts
// ': number' is type annotation
let apples: number = 5; // assign a value of type number to the variable of apples
let speed: string = 'fast';
let hasName: boolean = true;

let nothingMuch: null = null;
let nothing: undefined = undefined;

// Built-in objects
let now: Date = new Date();
```

#### Type annotations: object literal annotations
```ts
// Array
let colors: string[] = ['red', 'green', 'blue'];
let myNumbers: number[] = [1, 2, 3];
let truths: boolean[] = [true, true, false];

// Classes
class Car {}
let car: Car = new Car();

// Object literal
let point: { x: number; y: number } = {
	x: 10,
	y: 20
};
```

#### Type annotations: annotations around functions
```js
// Function
// ': (i: number) => void' is the annotation, a description of a function
const logNumber: (i: number) => void = (i: number) => {
	console.log(i);
};
```

#### Type inference: understanding inference
```js
// const color = variable declaration
// 'red' = variable initialization
const color = 'red';
```
- If declaration and initialization are on the same line (in one single expression), Typescript will figure out the type of 'color' for us

#### When to use...
- Type inference: TS guesses the type
  - Always!
- Type annotations: We (developers) tell TS the type
  - When we declare a variable on one line then initialize it later
  - When we want a variable to have a type that can't be inferred
  - When a function returns the 'any' type and we need to clarify the value
    - TS has no idea what this is - can't check for correct property references
    - Avoid variables with 'any' at all costs
  ```js
  // When to use annotations
  // 1) Function that returns the 'any' type
  const json = '{"x": 10, "y": 20}';
  const coordinates = JSON.parse(json);
  console.log(coordinates); //{x: 10, y: 20}

  // Fixing the 'any' type
  const json = '{"x": 10, "y": 20}';
  const coordinates: { x: number; y: number } = JSON.parse(json);
  console.log(coordinates); //{x: 10, y: 20}

  // 2) When we declare a variable on one line
  // and initialize it later
  let words = ['red', 'green', 'blue'];
  let foundWord: boolean;

  for (let i = 0; i < words.length; i++) {
    if (words[i] === 'green') foundWord = true;
  }

  // 3) Variable whose type cannot be inferred correctly
  let numbers = [-10, -1, 12];
  let numberAboveZero: boolean | number = false;

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > 0) {
      numberAboveZero = numbers[i];
    }
  }
  ```


### TYPE ANNOTATIONS + TYPE INFERENCE FOR FUNCTIONS

#### Type annotations around functions
- Code we add to tell TS what type of arguments a function will receive and what type of values it will return
  ```js
  // 'a: number' type annotation for input arguments
  // ': number' type annotation for what the function will return
  const add = (a: number, b: number): number => {
    return a + b;
  };
  ```

#### Type inference around functions
- TS tries to figure out what type of value a function will return, but it will not try to figure out what type of value the arguments are
- Although we've declared the what type of value the function will return, TS isn't going to check whether we have the correct code inside the function
- No type inference for arguments. So we ALWAYS ANNOTATE input arguments every single time we define a function
- Type inference works out function output, but we won't use it. So we ALWAYS ANNOTATE function output

#### Different function syntax with type annotations
```js
// Arrow function with annotations for arguments and return
const subtract = (a: number, b: number): number => {
	return a - b;
};

// Function keyword
function divide(a: number, b: number): number {
	return a / b;
}

// Anonymous function assigned variable to
const multiply = function (a: number, b: number): number {
	return a * b;
};
```

#### Function return: void and never
```ts
// Use function return void when there's no return value from the function
// Technically it can return 'null' or 'undefined'
const logger = (message: string): void => {
	console.log(message);
};

// We're never going to reach the end of this function
// exit the function early without returning any value
// this is not very common
const throwError = (message: string): never => {
	throw new Error(message);
};
```

#### Destructuring with annotations
```ts
// Destructuring
const todaysWeather = {
	date: new Date(),
	weather: 'sunny'
};

const logWeather = ({
	date,
	weather
}: {
	date: Date;
	weather: string;
}): void => {
	console.log(date);
	console.log(weather);
};

logWeather(todaysWeather);
```


### TYPE ANNOTATIONS FOR OBJECTS
```ts
const profile = {
	name: 'alex',
	age: 20,
	coords: {
		lat: 0,
		lng: 15
	},
	setAge(age: number): void {
		this.age = age;
	}
};

// Destructuring age and name from profile
// '{age: number}' is the expected structure of profile
//  - '{}' profile is an object
//  - 'age' is a property of profile
//  - ': number' age has a type of number
const { age, name }: { age: number; name: string } = profile;

// Regular destructuring of lat & lng
const { coords: { lat, lng } } = profile;

// Destructuring lat & lng with annotations
const {
	coords: { lat, lng }
}: { coords: { lat: number; lng: number } } = profile;
```
