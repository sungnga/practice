// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)

const names = require('./04-names');
// or destructure the object
const { john, peter } = require('./04-names');
const sayHi = require('./05-utils');
const data = require('./06-alternative-flavor');
// The addValues() function is executed when requiring this module
require('./07-mind-grenade');

console.log(data);
sayHi('susan');
sayHi(names.john);
sayHi(names.peter);

// console.log(module);
