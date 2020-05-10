import './utils.js'
console.log('app.js is running :))))')

import anythingIWant, {add, square} from './utils.js'
console.log(square(5))
console.log(add(5))
console.log(anythingIWant(8, 2))

import { isAdult, canDrink} from './utils'
console.log(isAdult(18))
console.log(canDrink(18))

import isSenior from './utils'
console.log(isSenior(65))


// ============================
// NOTES
// ============================

// ES6 Import/Export
// 2 types of exports:
// 1. default export: every file can have a single default export
// 2. named exports: can have as many named exports as you like

// To export named exports:
//  - export at the bottom of the file
//  - the export statement: export {} 
//  - define the named export inside the curly braces
//  - they are references to things we want to export
//  - note that the curly braces is not an object definition
//  - export { add, square };
// An alternative way to export a named export is to place the 'export' keyword in front of the variable declaration
//  - export const square = (x) => x * x;

// To import the named exports:
// Inside the file that wants to use the named exports, import the named exports inside the curly braces and provide the path to the file
// import { square, add } from './utils.js'
// Only import the named exports you want to use. No need to import them all
// Make sure the name in the import/export match each other
// The order inside the curly braces does not matter

// Default export:
//  - can only have a single default export
//  - attach 'as default' after the reference name
//  - export { refName as default }
//  - to access the default export, in the import file: import nameOfDefaultExport from 'path to file'
//  - don't include the curly braces when accessing the default export
//  - for default export, when importing, the name can be whatever you want
//  - importing default export and named exports: import anythingIWant, { add, square } from 'path to file'
//  - an alternative way of exporting default is to put it in a single expression. Can not use it with a statement
//  - const subtract = () => {...}  (a statement)
//  - export default subtract  (an expression. reference the subtract variable)

