console.log('utils.js is running');

// Exporting named exports and default
const square = (x) => x * x;
const add = (x) => x + x;
const subtract = (a, b) => a - b
export { subtract as default, square, add };
    
// Exporting default must be a single expression. Can not export default with statement
const subtract = (a, b) => a - b
export default subtract

// Another way of exporting named exports
export const isAdult = (age) => age >= 18
export const canDrink = (age) => age >= 21

// Exporting default
const isSenior = (age) => age >= 65
export default isSenior
