// Super class
class Vehicle {
	drive(): void {
		console.log('chugga chugga');
	}

	honk(): void {
		console.log('beep');
	}
}

// Car class extends the Vehicle super class
// Car is a child class of Vehicle parent class
class Car extends Vehicle {
	// Overwrite the inherited method
	drive(): void {
		console.log('vroom');
	}
}

const car = new Car();
car.drive();
car.honk();

// =======================

// With method modifiers
class Vehicle {
	protected honk(): void {
		console.log('beep');
	}
}

const vehicle = new Vehicle();
vehicle.honk(); // can't call honk() outside of child class Car

class Car extends Vehicle {
	private drive(): void {
		console.log('vroom');
	}

	startDrivingProcess(): void {
		this.drive();
		this.honk(); // this is allowed
	}
}

const car = new Car();
car.startDrivingProcess();
car.honk(); // can't call honk() outside of child class Car

// =======================

// Fields in classes
class Vehicle {
	// color: string;

  // add the public keyword in front of color field
  // can use keyword modifiers on a field/property
  // a shortcut way to define color field inside a class
	constructor(public color: string) {
		// this.color = color;
	}

	protected honk(): void {
		console.log('beep');
	}
}

const vehicle = new Vehicle('orange');
console.log(vehicle.color);

// =======================

// Fields with inheritance
class Vehicle {
	constructor(public color: string) {}

	protected honk(): void {
		console.log('beep');
	}
}

const vehicle = new Vehicle('orange');
console.log(vehicle.color);

class Car extends Vehicle {
	// defining two fields of Car class
	constructor(public wheels: number, color: string) {
		// when defining a constructor method inside a child class
		// must call super() to invoke the constructor method in super class
		// super constructor requires a color field argument
		super(color);
	}

	private drive(): void {
		console.log('vroom');
	}

	startDrivingProcess(): void {
		this.drive();
		this.honk(); // this is allowed
	}
}

// Must provide the two arguments when instantiating
// a new object from Car class
const car = new Car(4, 'red');
car.startDrivingProcess();
