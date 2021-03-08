### Installing Typescript compiler:
- `sudo npm i -g typescript ts-node`
- We get a `tsc` CLI, a typescript compiler
- The command `tsc` compiles typescript code into plain Javascript
  - `tsc index.ts`
  - We get back a JS file: index.js
  - Run `node index.js` to execute the JS file
- The command `ts-node` combines the commands `tsc index.ts` and `node index.js` into one. It compiles the typescript code and automatically executes the resulting javascript code
  - `ts-node index.ts`

### VSCode setup:
- Install PATH
- Prettier by Esben Petersen
  - Go to Settings -> check Format on Save box
  - Check the Prettier: Single Quote box
  - Set Editor: Tab Size to 2

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
- 1. Type in TS is a shortcuts for describing the different properties and methods that a single value has
- 2. Every single value in TS has a type

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


