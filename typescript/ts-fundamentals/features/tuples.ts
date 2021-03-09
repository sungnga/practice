const drink = {
	color: 'brown',
	carbonated: true,
	sugar: 40
};

// An annotated tuple
const pepsi: [string, boolean, number] = ['brown', true, 40];

// Type alias
type Drink = [string, boolean, number];

// A tuple with type alias
const sprite: Drink = ['clear', true, 20];
const tea: Drink = ['brown', false, 0];

// A tuple to model a record
const carSpecs: [number, number] = [4000, 3355];
// An object to model a record
const carStats = {
	horsePower: 400,
	weight: 3355
};
