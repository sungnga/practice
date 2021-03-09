const carMakers: string[] = ['ford', 'toyota', 'chevy'];
const dates = [new Date(), new Date()];

// An array of type string using type inference. No annotations.
const carsByMake = [['f150'], ['corolla'], ['camaro']];
const arrayOfArrays: string[][] = [];

// Help with inference when extracting values
const carMakers: string[] = ['ford', 'toyota', 'chevy'];
const car = carMakers[0];
const myCar = carMakers.pop();

// Prevent incompatible values
carMakers.push(100); // can't do this

// Help with 'map'
carMakers.map((car: string): string => {
	return car.toUpperCase();
});

// Flexible types
// Multiple types in arrays
const importantDates: (Date | string)[] = [];
importantDates.push('2030-10-10');
importantDates.push(new Date());
importantDates.push(100); // can't do this
