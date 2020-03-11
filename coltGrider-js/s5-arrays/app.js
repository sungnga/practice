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

// Note: when using these methods, you're mutating the original array itself

let topSongs = [
    'song1',
    'song2',
    'song3',
    'song4'
]

topSongs.push('song5'); // add to the end

const nextSong = topSongs.pop(); //capture the last item in the array with pop() method and store it in the variable nextSong. That last item will be removed from the array






