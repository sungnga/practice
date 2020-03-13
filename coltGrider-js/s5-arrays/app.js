// GOALS
// - Work with arrays
// - Write Object Literals
// - Understand Reference Types
// - Use common Array/Object methods    

// ARRAYS
// ordered collections of values.


// CREATING ARRAYS

// To make an empty array
let students = [];
new Array(); //[]

// Can initialize an array with data in it
//An array of strings
let colors = ['red', 'orange', 'yello'];

//An array of numbers
let lottoNums [19, 22, 56, 12, 51];

// A mixed array
let stuff = [true, 68, 'cat', null, NaN];


// ARRAY INDICES

// Array indices starts at 0
// like strings, arrays have .length property

let colors = ['red', 'orange', 'yellow'];

colors[colors.length - 1]; //'yellow'


 // MODIFYING ARRAYS

// specify the index and assign a new value to it
// Note: this will overwrite the existing value assigned to that index

shoppingList[shoppingList.length] = 'potatoes'; //adds at the end of the array

 
// ARRAY METHODS
// Push - add to end
// Pop - remove from end
// Shift - remove from start
// Unshift - add to start
// concat - merge arrays
// includes - look for a value
// indexOf - just like str.indexOf
// join - creates a string from arr
// reverse - reverses an array!
// slice - copy portion of an arr
// splice - remove/replace elements
// sort - sorts an arr

// Note: when using these methods, you're mutating the original array itself

let topSongs = [
    'song1',
    'song2',
    'song3',
    'song4'
]

topSongs.push('song5'); // add to the end

const nextSong = topSongs.pop(); //returns the last item in the array with pop() method and store it in the variable nextSong. That last item will be removed from the array

dishesToDo.unshift('fork', 'knife') // can pass in multiple items with all these methods

// CONCAT
// concat() method creates a new array

let fruits = ['apple', 'bannana'];
let veggies = ['aparagus', 'brussel sprouts'];
let meats = ['steak', 'chicken breast'];

console.log(fruits.concat(veggies));
let allFood = fruits.concat(veggies, meats);


// INCLUDES AND INDEXOF
// includes() is a boolean method. Returns true or false. It checks to see if the array contains the specified element

let ingredients = [
    'water',
    'corn starch',
    'flour',
    'cheese',
    'butter'
];

ingredients.includes('fish'); //returns false

if (ingredients.includes('flour')) {
    console.log('I am gluten free, I cannot eat that!')
}

// indexOf() returns the first index at which a given element can be found in the array or -1 if it is not present

ingredients.indexOf('water'); //0 

// REVERSE
// reverses the content of the array. will mutate the original array

// JOIN
// will combine all the elements into a single string
// by default, it separates by a comma, but can replace it w/ anything you want
// if the arr values are not string, it will convert them into strings, and then join them into a string

let letter = ['T', 'C', 'E', 'P', 'S', 'E', 'R'];

letters.join(); //"T,C,E,P,S,E,R"
letters.join('&'); //"T&C&E&P&S&E&R"
letters.reverse().join('.') //"R.E.S.P.E.C.T"


// SLICE
// if no arg passed in, it will make a copy of the arr (common use case to make a copy of an array)
// returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included) where begin and end represent the index of items in that array
// the original will not be modified

let animals = ['shark', 'salmon', 'whale', 'bear', 'lizard', 'tortoise']

let swimmers = animals.slice(0, 3);

swimmers //(3) ["shark", "salmon", "whale"]


// SPLICE
// splice() changes the contents of an array by removing or replacing existing elements and/or adding new elements IN PLACE
// an array containing the deleted elements
// if only one element is removed, an array of one element is returned 
// if no elements are removed, an empty array is returned

let animals = ['shark', 'salmon', 'whale', 'bear', 'lizard', 'tortoise']

//splice(startIdx, deleteCount, itemsToInsert);

//inserting an item
//'at index 1, delete 0 items and insert "octopus"'
animals.splice(1, 0, 'octopus'); //[] <--it's empty cuz it didn't delete anything by passing in 0 as 2nd arg

animals //(7) ["shark", "octopus", "salmon"....]

//deleting items
//'at index 5, delete 2 items'
animals.splice(3, 2); //(2) ["whale", "bear"] <--returns the elements being deleted

animals //(5) ["shark", "octopus", "salmon", "lizard", "tortoise"] <--the removed items is gone from the arr

//replacing items
//'at index 0, delete 2 items and replace them with "orca" and "grizzly"'
animals.splice(0, 2, 'orca', 'grizzly');

animals //["shark", "octopus", "salmon", "orca", "grizzly"]