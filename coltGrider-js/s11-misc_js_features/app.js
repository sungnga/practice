// ==================
// DEFAULT PARAMETERS
// ==================

// The old way of adding a default value:
// function multiply(x, y) {
//   if (typeof y === 'undefined') {
//     y = 1;
//   }
//   return x * y;
// }

// A slightly shorter version:
// function multiply(x, y) {
//   y = typeof y === 'undefined' ? 1 : y
//   return x * y;
// }

// The new super clean way of adding defaults!
function multiply(x, y = 1) {
  return x * y;
}
multiply(3, 4); //12
multiply(3); //3

// Another example!
// const greet = (person, greeting = 'hi') => {
//   console.log(`${greeting}, ${person}!`)
// }

// Default value of an array:
// const blah = (x, y = [1, 2, 3]) => {
//   console.log(x, y);
// }

// Multiple default values are possible, but rare
// const greet = (person, greeting = 'hi', punctuation = '!') => {
//   console.log(`${greeting}, ${person} ${punctuation}`)
// }


// =========================
// SPREAD FOR FUNCTION CALLS
// =========================

function giveMeFour(a, b, c, d) {
  console.log('a', a)
  console.log('b', b)
  console.log('c', c)
  console.log('d', d)
}

const colors = ['red', 'orange', 'yellow', 'green']

// Without spread:
giveMeFour(colors);
// a ["red", "orange", "yellow", "green"]
// b undefined
// c undefined
// d undefined

// WITH SPREAD!!!
// Values are passed as separate args:
giveMeFour(...colors);
// a 'red'
// b 'orange'
// c 'yellow'
// d 'green'

//We can also spread strings!
giveMeFour(...'GOAT');
// a G
// b O
// c A
// d T


// =========================
// SPREAD FOR ARRAY LITERALS
// =========================

const cephalopods = ['dumbo octopus', 'humboldt squid', 'flamboyant cuttlefish'];

const gastropods = ['giant african snail', 'banana slug', 'variable neon slug'];

const cnidaria = ['fire coral', 'moon jelly'];


const mollusca = [...cephalopods, ...gastropods]
//["dumbo octopus", "humboldt squid", "flamboyant cuttlefish", "giant african snail", "banana slug", "variable neon slug"]

const inverts = [...cnidaria, ...gastropods, ...cephalopods]
//["fire coral", "moon jelly", "giant african snail", "banana slug", "variable neon slug", "dumbo octopus", "humboldt squid", "flamboyant cuttlefish"]

const cephCopy = [...cephalopods];
//["dumbo octopus", "humboldt squid", "flamboyant cuttlefish"]


// ==========================
// SPREAD FOR OBJECT LITERALS
// ==========================

const feline = {
  legs: 4,
  family: 'Felidae'
};

const canine = {
  family: 'Caninae',
  furry: true,
  legs: 4
};

const dog = {
  ...canine,
  isPet: true,
  adorable: true
}
//{family: "Caninae", furry: true, legs: 4, isPet: true, adorable: true}

const houseCat = {
  ...feline,
  isGrumpy: true,
  personality: 'unpredictable'
}
//{legs: 4, family: "Felidae", isGrumpy: true, personality: "unpredictable"}

const catDog = {
  ...canine,
  ...feline
}
//{family: "Felidae", furry: true, legs: 4}

//Order matters! Legs will be 3 here, because we set it AFTER spreading canine.
const tripod = {
  ...canine,
  legs: 3,
}
//{family: "Caninae", furry: true, legs: 3}

const catDogClone = {
  ...catDog
}

const random = [...'hello', {
  ...catDog
}]


// ==============================
// THE ARGUMENTS OBJECT (NOT NEW)
// ==============================

//The arguments object is available in every function you write (except arrow functions)
//It contains all the arguments passed in.
function sum() {
  //It is NOT an array, we have to turn it into one if we want to use array methods
  const argsArr = [...arguments]
  return argsArr.reduce((total, currVal) => {
    return total + currVal
  })
}

// No arguments object inside of arrow functions :(
const multiply = () => {
  console.log(arguments);
}


// =====================
// REST PARAMETERS (NEW)
// =====================

// OLD WAY!
// function sum() {
//   const argsArr = [...arguments]
//   return argsArr.reduce((total, currVal) => {
//     return total + currVal
//   })
// }

// New way using rest:
function sum(...nums) {
  return nums.reduce((total, currVal) => {
    return total + currVal
  })
}

//We can have named params and then collect the rest into an array:
function fullName(first, last, ...titles) {
  console.log('first', first)
  console.log('last', last)
  console.log('titles', titles)
}

// We can use rest parameters in arrow functions!
const multiply = (...nums) => (
  nums.reduce((total, currVal) => total * currVal)
)


// ====================
// DESTRUCTURING ARRAYS
// ====================

const raceResults = [
  'Eliud Kipchoge',
  'Feyisa Lelisa',
  'Galen Rupp',
  'Ghirmay Ghebreslassie',
  'Alphonce Simbu',
  'Jared Ward'
];

// The old way:
// const gold = raceResults[0]
// const silver = raceResults[1]
// const bronze = raceResults[2]

// Using Destructuring:
const [gold, silver, bronze] = raceResults;
gold; //'Eliud Kipchoge'
silver; //'Feyisa Lelisa'
bronze; //'Galen Rupp'

const [first, , , fourth] = raceResults;
first; //'Eliud Kipchoge'
fourth; //'Ghirmay Ghebreslassie'

const [winner, ...others] = raceResults;
winner; //'Eliud Kipchoge'
others; //["Feyisa Lelisa", "Galen Rupp", "Ghirmay Ghebreslassie", "Alphonce Simbu", "Jared Ward"]


// =====================
// DESTRUCTURING OBJECTS
// =====================

const runner = {
  first: "Eliud",
  last: "Kipchoge",
  country: "Kenya",
  title: "Elder of the Order of the Golden Heart of Kenya"
}

// const {
//   first,
//   last,
//   time
// } = runner;

const {
  country: nation,
  title: honorific
} = runner;

const {
  first,
  last,
  ...other
} = runner;


// ====================
// NESTED DESTRUCTURING
// ====================

const results = [{
    first: "Eliud",
    last: "Kipchoge",
    country: "Kenya",
  },
  {
    first: 'Feyisa',
    last: 'Lilesa',
    country: 'Ethiopia'
  },
  {
    first: 'Galen',
    last: 'Rupp',
    country: 'United States'
  }
]
// NESTED DESTRUCTURING
const [{
  first: goldWinner
}, {
  country
}] = results;
goldWinner; //"Eliud"
country; //"Ethiopia"


// ========================
// DESTRUCTURING PARAMETERS
// ========================

const runner = {
  first: "Eliud",
  last: "Kipchoge",
  country: "Kenya",
  title: "Elder of the Order of the Golden Heart of Kenya"
}

// Rather than destructuring INSIDE the function body
// function print(person) {
//   const {
//     first,
//     last,
//     title
//   } = person;
//   console.log(`${first} ${last}, ${title}`)
// }

// We can unpack the values we want right in the parameter list:
function print({
  first,
  last,
  title
}) {
  console.log(`${first} ${last}, ${title}`)
}

const response = [
  'HTTP/1.1',
  '200 OK',
  'application/json',
]

// Also works with array parameters:
function parseResponse([protocol, statusCode, contentType]) {
  console.log(`Status: ${statusCode}`)
}
