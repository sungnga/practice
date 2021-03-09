// Long type annotations
// const oldCivic = {
// 	name: 'civic',
// 	year: 2000,
// 	broken: true
// };

// const printVehicle = (vehicle: {
// 	name: string;
// 	year: number;
// 	broken: boolean;
// }): void => {
// 	console.log(`Name: ${vehicle.name}`);
// 	console.log(`Year: ${vehicle.year}`);
// 	console.log(`Broken? ${vehicle.broken}`);
// };

// printVehicle(oldCivic);


// Fixing annotations with interfacesc
// interface Vehicle {
// 	name: string;
// 	year: number;
// 	broken: boolean;
// }

// const oldCivic = {
// 	name: 'civic',
// 	year: 2000,
// 	broken: true
// };

// const printVehicle = (vehicle: Vehicle): void => {
// 	console.log(`Name: ${vehicle.name}`);
// 	console.log(`Year: ${vehicle.year}`);
// 	console.log(`Broken? ${vehicle.broken}`);
// };

// printVehicle(oldCivic);


//Syntax around interfaces
// can be other types than primitive types
// can express functions inside an interface definition
// interface Vehicle {
// 	name: string;
// 	year: Date;
// 	broken: boolean;
// 	// a function that returns a string
// 	summary(): string;
// }

// const oldCivic = {
// 	name: 'civic',
// 	year: new Date(),
// 	broken: true,
// 	summary(): string {
// 		return `Name: ${this.name}`;
// 	}
// };

// const printVehicle = (vehicle: Vehicle): void => {
// 	console.log(vehicle.summary());
// };

// printVehicle(oldCivic);


// Code reuse with interfaces
interface Reportable {
	// a function that returns a string
	summary(): string;
}

const oldCivic = {
	name: 'civic',
	year: new Date(),
	broken: true,
	summary(): string {
		return `Name: ${this.name}`;
	}
};

const drink = {
	color: 'brown',
	carbonated: true,
	sugar: 40,
	summary(): string {
		return `My drink has ${this.sugar} grams of sugar`;
	}
};

const printSummary = (item: Reportable): void => {
	console.log(item.summary());
};

printSummary(oldCivic);
printSummary(drink);
