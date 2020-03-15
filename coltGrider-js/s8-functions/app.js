// ==================
// OUR FIRST FUNCTION
// ==================

// STEP 1: Define the function:
function grumpus() {
	console.log('ugh...you again...');
	console.log('FOR THE LAST TIME...');
	console.log('LEAVE ME ALONE!!!');
}
// STEP 2: Call the function:
grumpus();
grumpus();
grumpus();

for (let i = 0; i < 50; i++) {
	grumpus();
}


// ==================
// DICE ROLL FUNCTION
// ==================

// Define our first function
function rollDie() {
	// Pick a random number from 1-6
	// - Math.random() gives us a decimal from 0-1
	// - We multiply by 6, so now we have a random number between 0 up to 6 (but not including 6).  Something likee 3.490823 or 5.991234
	// - Then we floor to remove the decimal,  leaving us with a whole number from 0-5
	//- Lastly we add one, to get a number between 1 and 6
	let roll = Math.floor(Math.random() * 6) + 1;
	console.log(`Rolled: ${roll}`);
}

// We can call functions inside of other functions!
function throwDice() {
	rollDie();
	rollDie();
	rollDie();
	rollDie();
	rollDie();
	rollDie();
}

//Call it!
throwDice();


// ==================
// INTRO TO ARGUMENTS
// ==================

// function greet() {
// 	console.log('Hi');
// }

// greet now expects a single argument
function greet(nickname) {
	console.log(`Hi, ${nickname}!`);
}
greet('Sansa');
greet('Ramsay');

// EXAMPLE 2
function rollDie() {
	let roll = Math.floor(Math.random() * 6) + 1;
	console.log(`Rolled: ${roll}`);
}
// We can now specify how many dice to roll!
function throwDice(numRolls) {
	for (let i = 0; i < numRolls; i++) {
		rollDie();
	}
}

throwDice(2);
throwDice(6);


// ==========================
// FUNCTIONS W/ MULTIPLE ARGS
// ==========================

function square(num) {
	console.log(num * num);
}

function sum(x, y) {
	console.log(x + y);
}

function divide(a, b) {
	console.log(a / b);
}


// ====================
// THE RETURN STATEMENT
// ====================

// No return!
function add(x, y) {
	console.log(x + y);
}

// This version returns the sum of x & y;
function add(x, y) {
	return x + y;
}

// We can capture the return value:
const total = add(4, 9); //13


// =====================
// MORE ON RETURN VALUES
// =====================

function square(x) {
	return x * x;
	console.log('ALL DONE!'); //this NEVER runs;
}

// One way of writing this function
function isPurple(color) {
	if (color.toLowerCase() === 'purple') {
		return true;
	}
	else {
		return false;
	}
}

// We don't need the else!
function isPurple(color) {
	if (color.toLowerCase() === 'purple') {
		return true;
	}
	return false;
}

// An even shorter way!
function isPurple(color) {
	return color.toLowerCase() === 'purple';
}

function containsPurple(arr) {
	for (let color of arr) {
		if (color === 'purple' || color === 'magenta') {
			return true;
		}
	}
	return false;
}


// ====================================
// FUNCT CHALLENGE 1: PASSWORDVALIDATOR
// ====================================
// Write a isValidPassword function
// It accepts 2 arguments: password and username
// Password must:
//	- be at least 8 characters
//  - cannot contain spaces
//  - cannot contain the username
// If all requirements are met, return true.
//Otherwise: false

// isValidPassword('89Fjj1nms', 'dogLuvr');  //true
// isValidPassword('dogLuvr123!', 'dogLuvr') //false
// isValidPassword('hello1', 'dogLuvr') //false

function isValidPassword(password, username) {
	if (password.length < 8) {
		return false;
	}
	if (password.indexOf(' ') !== -1) {
		return false;
	}
	if (password.indexOf(username) !== -1) {
		return false;
	}
	return true;
}

function isValidPassword(password, username) {
	if (
		password.length < 8 ||
		password.indexOf(' ') !== -1 ||
		password.indexOf(username) !== -1
	) {
		return false;
	}
	return true;
}

function isValidPassword(password, username) {
	const tooShort = password.length < 8;
	const hasSpace = password.indexOf(' ') !== -1;
	const tooSimilar = password.indexOf(username) !== -1;
	if (tooShort || hasSpace || tooSimilar) return false;
	return true;
}

function isValidPassword(password, username) {
	const tooShort = password.length < 8;
	const hasSpace = password.indexOf(' ') !== -1;
	const tooSimilar = password.indexOf(username) !== -1;
	if (!tooShort && !hasSpace && !tooSimilar) return true;
	return false;
}

function isValidPassword(password, username) {
	const tooShort = password.length < 8;
	const hasSpace = password.indexOf(' ') !== -1;
	const tooSimilar = password.indexOf(username) !== -1;
	return !tooShort && !hasSpace && !tooSimilar;
}


// ===========================
// FUNCT CHALLENGE 2: AVERAGE
// ===========================
// Write a function to find the average value in an array of numbers
//avg([0,50]) //25
//avg([75,76,80,95,100]) //85.2

function avg(arr) {
	let total = 0;
	//loop over each num
	for (let num of arr) {
		//add them together
		total += num;
	}
	//divide by number of nums
	return total / arr.length;
}


// ============================
// FUNCT CHALLENGE 3: PANGRAMS
// ============================
// A pangram is a sentence that contains every letter of the alphabet, like:
//"The quick brown fox jumps over the lazy dog"

// Write a function called isPangram, which checks to see if a given sentence contains every letter of the alphabet.  Make sure you igore string casing!

// isPangram('The five boxing wizards jump quickly') //true
// isPangram('The five boxing wizards jump quick') //false

// Version using indexOf
function isPangram(sentence) {
	let lowerCased = sentence.toLowerCase();
	for (let char of 'abcdefghijklmnopqrstuvwxyz') {
		if (lowerCased.indexOf(char) === -1) {
			return false;
		}
	}
	return true;
}

// Version using string.includes()
// Nice and clean, but not supported in IE
function isPangram(sentence) {
	let lowerCased = sentence.toLowerCase();
	for (let char of 'abcdefghijklmnopqrstuvwxyz') {
		if (!lowerCased.includes(char)) {
			return false;
		}
	}
	return true;
}


// ====================================
// FUNCT CHALLENGE 4: GET PLAYING CARD
// ====================================
// Write a getCard() function which returns a random playing card object, like:
// 		{
// 			value: 'K'
// 			suit: 'clubs'
// 		}
//Pick a random value from:
//----1,2,3,4,5,6,7,8,9,10,J,Q,K,A
//Pick a random suit from:
//----clubs,spades, hearts, diamonds
//Return both in an object

// function getCard() {
// 	const values = [
// 		'1',
// 		'2',
// 		'3',
// 		'4',
// 		'5',
// 		'6',
// 		'7',
// 		'8',
// 		'9',
// 		'10',
// 		'J',
// 		'Q',
// 		'K',
// 		'A'
// 	];
// 	const valIdx = Math.floor(Math.random() * values.length);
// 	const value = values[valIdx];

// 	const suits = [ 'clubs', 'spades', 'hearts', 'diamonds' ];
// 	const suitIdx = Math.floor(Math.random() * suits.length);
// 	const suit = suits[suitIdx];
// 	return { value: value, suit: suit };
// }

function pick(arr) {
	//return random element from arr
	const idx = Math.floor(Math.random() * arr.length);
	return arr[idx];
}

function getCard() {
	const values = [
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'J',
		'Q',
		'K',
		'A'
	];
	const suits = [ 'clubs', 'spades', 'hearts', 'diamonds' ];
	return { value: pick(values), suit: pick(suits) };
}
