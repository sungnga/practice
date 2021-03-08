// 'a: number' type annotation for input arguments
// ': number' type annotation for what the function will return
// Arrow function with no annotation for function return
const add = (a: number, b: number) => {
	return a + b;
};

// Arrow function with annotations for arguments and return
const subtract = (a: number, b: number): number => {
	return a - b;
};

// Function keyword
function divide(a: number, b: number): number {
	return a / b;
}

// Anonymous function assigned variable to
const multiply = function (a: number, b: number): number {
	return a * b;
};

// Use function return void when there's no return value from the function
// Technically it can return 'null' or 'undefined'
const logger = (message: string): void => {
	console.log(message);
};

// We're never going to reach the end of this function
// exit the function early without returning any value
// this is not very common
const throwError = (message: string): never => {
	throw new Error(message);
};

// Destructuring
const todaysWeather = {
	date: new Date(),
	weather: 'sunny'
};

const logWeather = ({
	date,
	weather
}: {
	date: Date;
	weather: string;
}): void => {
	console.log(date);
	console.log(weather);
};

// ES2015
// const logWeather = ({ date, weather }) => {
//   console.log(date)
//   console.log(weather)
// }

logWeather(todaysWeather);
