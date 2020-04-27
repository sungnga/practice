// =====================
// FOR LOOPS
// =====================
// 3 pieces to a for loop:
// 1 - Variable declaration
// 2 - The condition
// 3 - Update the loop variable

// STEP 1: 'let i = 1' - start i at 1
// STEP 2: 'i <= 10' - run the loop as long as i <= 10
// STEP 3: 'i++' - add 1 to i each time through
for (let i = 1; i <= 10; i++) {
	console.log('HELLO:', i);
}

// Counting by 3's:
for (let i = 1; i <= 10; i += 3) {
	console.log('HELLO:', i);
}

// Printing first 20 perfect squares:
for (let num = 1; num <= 20; num++) {
	console.log(`${num}x${num} = ${num * num}`);
}

// Counting DOWN from 200 by intervals of 25:
for (let i = 200; i >= 0; i -= 25) {
	console.log(i);
}
console.log('AFTER THE LOOP!');


// =====================
// INFINITE LOOPS!
// =====================
// DON'T RUN THIS!
// for (let i = 1; i !== 20; i += 2) {
// 	console.log(i);
// }

// THE ABOVE LOOP NEVER ENDS
// i starts at 1, and we add 2 each time
// 1,3,5,7,9,11,13,15,17,19,21,etc.
// i never hits 20, so the loop condition is always true

// Instead, write it this way:
for (let i = 1; i <= 20; i += 2) {
	console.log(i);
}


// =====================
// FOR LOOPS & ARRAYS
// =====================

// ======= EXAMPLE 1 ==========
// Printing each element in an array
const examScores = [ 98, 77, 84, 91, 57, 66 ];

for (let i = 0; i < examScores.length; i++) {
	console.log(i, examScores[i]);
}

// ======= EXAMPLE 2 ==========
// Same idea, but with a more complex array
const myStudents = [
	{
		firstName : 'Zeus',
		grade     : 86
	},
	{
		firstName : 'Artemis',
		grade     : 97
	},
	{
		firstName : 'Hera',
		grade     : 72
	},
	{
		firstName : 'Apollo',
		grade     : 90
	}
];

for (let i = 0; i < myStudents.length; i++) {
	let student = myStudents[i];
	console.log(`${student.firstName} scored ${student.grade}`);
}

// ======= EXAMPLE 3 ==========
// Averaging all grades in myStudents array
let total = 0; //total will hold the sum of all grades

for (let i = 0; i < myStudents.length; i++) {
	let student = myStudents[i];
	total += student.grade; //add each grade to total
}
console.log(total / myStudents.length); //divide by number of students

// ======= EXAMPLE 4 ==========
// Reversing a string
const word = 'stressed';

let reversedWord = ''; //will hold reversed string

//Loop backwards over the string
for (let i = word.length - 1; i >= 0; i--) {
	reversedWord += word[i]; //add each char to reversedWord
}

console.log(reversedWord);


// =====================
// NESTED FOR LOOPS
// =====================

for (let i = 1; i <= 10; i++) {
	console.log('OUTER LOOP:', i);
	for (let j = 10; j >= 0; j -= 2) {
		console.log('  INNER LOOP', j);
	}
}

// EXAMPLE 2
// Sum all elements in our 2048 board
const gameBoard = [
	[ 4, 32, 8, 4 ],
	[ 64, 8, 32, 2 ],
	[ 8, 32, 16, 4 ],
	[ 2, 8, 4, 2 ]
];

let totalScore = 0;
//outer loop iterates through the rows
for (let i = 0; i < gameBoard.length; i++) {
	let row = gameBoard[i];
	//inner loop iterates over each cell in a given row
	for (let j = 0; j < row.length; j++) {
		totalScore += row[j];
	}
}


// =====================
// INTRO TO WHILE LOOP
// =====================

for (let i = 0; i <= 5; i++) {
	console.log(i);
}

//Recreating the above for loop w/ a while loop:
let j = 0;
while (j <= 5) {
	console.log(j);
	j++;
}


// =====================
// MORE WHILE LOOPS
// =====================

// Pick a target number we are trying to guess
const target = Math.floor(Math.random() * 10);
// Make initial guess
let guess = Math.floor(Math.random() * 10);

// Continue looping while guess is not the target num
while (guess !== target) {
	console.log(`Target: ${target} Guess: ${guess}`);
	// IMPORTANT!!
	// Update the value of guess each time through the loop
	guess = Math.floor(Math.random() * 10);
}
console.log(`Target: ${target} Guess: ${guess}`);
console.log(`CONGRATS YOU WIN!!`);


// =====================
// BREAK KEYWORD
// =====================

const target = Math.floor(Math.random() * 10);
let guess;
//ANOTHER APPROACH TO THE PREVIOUS GUESSING 'GAME'
while (true) {
	if (target === guess) break; //Break stops the loop in its tracks
	console.log(`Target: ${target} Guess: ${guess}`);
	guess = Math.floor(Math.random() * 10);
}
console.log(`Target: ${target} Guess: ${guess}`);
console.log(`CONGRATS YOU WIN!!`);


// =====================
// FOR...OF INTRO
// =====================

let subreddits = [ 'soccer', 'popheads', 'cringe', 'books' ];
// With a standard for loop
for (let i = 0; i < subreddits.length; i++) {
	console.log(subreddits[i]);
}
//Much cleaner  with a for...of loop!
for (let sub of subreddits) {
	console.log(sub);
}
//Works with other iterables, like strings!
for (let char of 'cockadoodledoo') {
	console.log(char.toUpperCase());
}


// ========================
// COMPARING FOR & FOR...OF
// ========================

const magicSquare = [ [ 2, 7, 6 ], [ 9, 5, 1 ], [ 4, 3, 8 ] ];

// Version using a for loop...
for (let i = 0; i < magicSquare.length; i++) {
	let row = magicSquare[i];
	let sum = 0;
	for (let j = 0; j < row.length; j++) {
		sum += row[j];
	}
	console.log(`${row} summed to ${sum}`);
}

// Much cleaner version using a for...of
for (let row of magicSquare) {
	let sum = 0;
	for (let num of row) {
		sum += num;
	}
	console.log(`${row} summed to ${sum}`);
}

// EXAMPLE 2
// If you need the indices, use a traditional for loop!
const words1 = [ 'mail', 'milk', 'bath', 'black' ];
const words2 = [ 'box', 'shake', 'tub', 'berry' ];

for (let i = 0; i < words1.length; i++) {
	//Access index i of both arrays
	console.log(`${words1[i]}${words2[i]}`);
}


// =====================
// FOR...OF WITH OBJECTS
// =====================

const movieReviews = {
	Arrival                : 9.5,
	Alien                  : 9,
	Amelie                 : 8,
	'In Bruges'            : 9,
	Amadeus                : 10,
	'Kill Bill'            : 8,
	'Little Miss Sunshine' : 8.5,
	Coraline               : 7.5
};

// THIS DOES NOT WORK!
// OBJECTS ARE NOT ITERABLE (can't use a for...of loop)
// for (let x of movieReviews) {
// 	console.log(x);
// }

// We CAN iterate over the keys of an object
for (let movie of Object.keys(movieReviews)) {
	console.log(`You rated ${movie} - ${movieReviews[movie]}`);
}

// We can also iterate over the values
// To calculate the average movie rating:
const ratings = Object.values(movieReviews);
let total = 0;
for (let r of ratings) {
	total += r;
}
let avg = total / ratings.length;
console.log('Average Rating: ', avg);


// =====================
// FOR...IN LOOPS
// =====================

const jeopardyWinnings = {
    regularPlay: 2522700,
    watsonChallenge: 300000,
    tournamentOfChampions: 500000,
    battleOfTheDecades: 100000
};

for (let prop in jeopardyWinnings) {
    console.log(prop);
    console.log(jeopardyWinnings[prop]);
}

let total = 0;
for (let prop in jeopardyWinnings) {
    totoal += jeopardyWinnings[prop];
}    

console.log(`Ken Jennings Total Earnings: ${total}`);

//Technically you can use for...in to loop over an array
//in an array, the keys are ordered set of indices
//if you use for...of in an array, it will automatically give you the values
for (let k in [88, 99, 77, 66]) {
    console.log(k);
}