// DOUBLE EQUALS

//Checks for equality of value, but not equality of type
//It coerces(tranforms) both values to the same type and then compares them
//This can lead to some expected results!

5 == 5; //true
'b' == 'c'; // false
7 == '7'; //true
0 == 's'; //false
0 == ''; //true
true == false; // false
0 == false; //true
null == undefined; //true

// TRIPLE EQUALS

//strict equality operator
//Checks for equality of value AND type

5 === 5; //true
1 === 2; //false
2 === '2'; //false
false === 0; //false
10 != '10'; //false
10 !== '10'; //true

// IF, ELSE IF, ELSE

let highScore = 1700;
let userScore = 1600;

if (userScore >= highScore) {
  console.log(`Congrats, you have a new high score of ${userScore}`);
  highScore = userScore;
} else {
  console.log(
    `Good Game. Your score of ${userScore} did not beat the high score of ${highScore}`
  );
}

// NESTING CONDITIONALS

let password = 'hello kitty';

if (password.length >= 6) {
  // if password has no space. -1 means false
  if (password.indexOf(' ') === -1) {
    console.log('Valid Password!');
  } else {
    console.log('Password is long enough, but cannot contain spaces');
  }
} else {
  console.log('Password must be longer!');
}

// TRUTHY & FALSY VALUES

//All values have an inherent truthy or falsy boolean value
//Often used in conditions to check if it is truthy or falsy
/*falsy values:
    false
    0
    "" (empty string)
    null
    undefined
    Nan
*/
//Everything else is truthy!

let loggedInUser = 0;

if (loggedInUser) {
  console.log('You are logged in!!');
} else {
  console.log('Please log in!');
}

// LOGICAL AND(&&), OR(||), NOT(!)

10 / 2 || null; //true
0 || undefined; //false  0 evaluates to false, undefined evalues to false. both are false, hence false

//the ! symbol negates whatever is to its opposite
!null; //true
!(0 === 0); //false
!(3 <= 4); //false

// OPERATOR PRECEDENCE

//In this order: () ! && ||

// SWITCH STATEMENTS

let day = 0;

switch (day) {
  case 1:
    console.log('MONDAY');
    break;
  case 2:
    console.log('TUESDAY');
    break;
  case 3:
    console.log('WEDNESDAY');
    break;
  case 4:
    console.log('THURSDAY');
    break;
  case 5:
    console.log('FRIDAY');
    break;
  case 6:
    console.log('SATURDAY');
    break;
  case 7:
    console.log('SUNDAY');
    break;
  default:
    console.log('INVALID DAY');
}

// TERNARY OPERATOR

// condition ? expIfTrue: expIfFalse

let num = 6;

// if (num === 7) {
//   console.log('lucky!');
// } else {
//   console.log('Bad!');
// }

num === 7 ? console.log('lucky!') : console.log('Bad!');

//type the word 'color' into the console
let status = 'online';

// let color;
// if (status === 'offline') {
//   color = 'red';
// } else {
//   color = 'green';
// }

let color = status === 'offline' ? 'red' : 'green';
