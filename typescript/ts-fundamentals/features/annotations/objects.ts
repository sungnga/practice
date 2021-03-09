const profile = {
	name: 'alex',
	age: 20,
	coords: {
		lat: 0,
		lng: 15
	},
	setAge(age: number): void {
		this.age = age;
	}
};

// Destructuring age and name from profile
// '{age: number}' is the expected structure of profile
//  - '{}' profile is an object
//  - 'age' is a property of profile
//  - ': number' age has a type of number
const { age, name }: { age: number; name: string } = profile;

// Regular destructuring of lat & lng
// const { coords: { lat, lng } } = profile;

// Destructuring lat & lng with annotations
const {
	coords: { lat, lng }
}: { coords: { lat: number; lng: number } } = profile;
