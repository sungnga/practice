// ========================
// 2 Ways NOT to Add Events
// ========================

// ***********************************
// Two ways NOT to add event handlers
// ***********************************

// **********************************
// Inline - take a look at index.html
// **********************************
// Check out index.html to see an example

// **********************************
// Via JS - setting the onclick property
// **********************************

// Select an element:
const btn = document.querySelector('#clicker');

// Set the onclick property to a function:

// You can use an existing function: (not that common)
// btn.onclick = greet; 

// Or use an anonymous function (more common)
btn.onclick = () => {
  console.log('YOU CLICKED ME UGHHHH!!');
}

function greet() {
  alert('HEY BUDDY!')
}


// ========================
// addEventListener
// ========================

const btn = document.querySelector('button');

btn.addEventListener('click', function() {
	alert('CLICKED!!!');
});

btn.addEventListener('click', function() {
	console.log('SECOND THING!!');
});

btn.addEventListener('mouseover', function() {
	btn.innerText = 'STOP TOUCHING ME';
});

btn.addEventListener('mouseout', function() {
	btn.innerText = 'Click Me!';
});

window.addEventListener('scroll', function() {
	console.log('STOP SCROLLING!!');
});


// ==========================
// The Impossible Button Demo
// ==========================

const btn = document.querySelector('button');

btn.addEventListener('mouseover', function() {
	console.log('MOUSED OVER ME!');
	const height = Math.floor(Math.random() * window.innerHeight);
	const width = Math.floor(Math.random() * window.innerWidth);
	btn.style.left = `${width}px`;
	btn.style.top = `${height}px`;
});

btn.addEventListener('click', function() {
	btn.innerText = 'YOU GOT ME!';
	document.body.style.backgroundColor = 'green';
});


// ===========================
// Events on Multiple Elements
// ===========================

const colors = [
	'red',
	'orange',
	'yellow',
	'green',
	'blue',
	'purple',
	'indigo',
	'violet'
];
const changeColor = function() {
	const h1 = document.querySelector('h1');
	h1.style.color = this.style.backgroundColor;
};
const container = document.querySelector('#boxes');

for (let color of colors) {
	const box = document.createElement('div');
	box.style.backgroundColor = color;
	box.classList.add('box');
	container.appendChild(box);
	box.addEventListener('click', changeColor);
}


// ========================
// The Event Object
// ========================

const colors = [
	'red',
	'orange',
	'yellow',
	'green',
	'blue',
	'purple',
	'indigo',
	'violet'
];
const h1 = document.querySelector('h1');
const changeColor = function(evt) {
	console.log(evt); //CONTAINS INFORMATION ON THE CLICK EVENT!
	h1.style.color = this.style.backgroundColor;
};
const container = document.querySelector('#boxes');

for (let color of colors) {
	const box = document.createElement('div');
	box.style.backgroundColor = color;
	box.classList.add('box');
	container.appendChild(box);
	box.addEventListener('click', changeColor);
}

document.body.addEventListener('keypress', function(e) {
	console.log(e); //CONTAINS INFORMATION ON THE KEYPRESS EVENT
});


// =====================================
// Key Events: keypress, keyup & keydown
// =====================================

const input = document.querySelector('#username');

input.addEventListener('keydown', function(e) {
	console.log('KEY DOWN!');
});

input.addEventListener('keyup', function(e) {
	console.log('KEY UP!');
});

input.addEventListener('keypress', function(e) {
	console.log('KEY PRESS!');
});

const addItemInput = document.querySelector('#addItem');
const itemsUL = document.querySelector('#items');

addItemInput.addEventListener('keypress', function(e) {
	if (e.key === 'Enter') {
		if (!this.value) return; //if input is empty, skip everything
		//add a new item to list
		const newItemText = this.value;
		const newItem = document.createElement('li');
		newItem.innerText = newItemText;
		itemsUL.appendChild(newItem);
		this.value = '';
	}
});


// ========================
// Coin Game Demo
// ========================

// *****************
// Coin Game Starter
// *****************
function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}

// ***********************
// Coin Game Complete
// ***********************
function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}

const init = () => {
	const avatar = document.querySelector('#player');
	const coin = document.querySelector('#coin');
	moveCoin();
	window.addEventListener('keyup', function(e) {
		if (e.key === 'ArrowDown' || e.key === 'Down') {
			moveVertical(avatar, 50);
		}
		else if (e.key === 'ArrowUp' || e.key === 'Up') {
			moveVertical(avatar, -50);
		}
		else if (e.key === 'ArrowRight' || e.key === 'Right') {
			moveHorizontal(avatar, 50);
			avatar.style.transform = 'scale(1,1)';
		}
		else if (e.key === 'ArrowLeft' || e.key === 'Left') {
			moveHorizontal(avatar, -50);
			avatar.style.transform = 'scale(-1,1)';
		}
		if (isTouching(avatar, coin)) moveCoin();
	});
};

const moveVertical = (element, amount) => {
	const currTop = extractPos(element.style.top);
	element.style.top = `${currTop + amount}px`;
};
const moveHorizontal = (element, amount) => {
	const currLeft = extractPos(element.style.left);
	element.style.left = `${currLeft + amount}px`;
};

const extractPos = (pos) => {
	if (!pos) return 100;
	return parseInt(pos.slice(0, -2));
};

const moveCoin = () => {
	const x = Math.floor(Math.random() * window.innerWidth);
	const y = Math.floor(Math.random() * window.innerHeight);
	coin.style.top = `${y}px`;
	coin.style.left = `${x}px`;
};

init();


// ============================
// Form Events & PreventDefault
// ============================

const form = document.querySelector('#signup-form');

const creditCardInput = document.querySelector('#cc');
const termsCheckbox = document.querySelector('#terms');
const veggieSelect = document.querySelector('#veggie');

form.addEventListener('submit', function(e) {
	e.preventDefault(); //stops the request from being sent (prevents page reload)
	console.log('cc', creditCardInput.value);
	console.log('terms', termsCheckbox.checked);
	console.log('veggieSelect', veggieSelect.value);
	//send form data to db
	//append something to page using form data
});


// ========================
// Input & Change Events
// ========================

const creditCardInput = document.querySelector('#cc');
const termsCheckbox = document.querySelector('#terms');
const veggieSelect = document.querySelector('#veggie');
const formData = {};
// ONE callback works for any number of inputs!!
for (let input of [ creditCardInput, termsCheckbox, veggieSelect ]) {
	input.addEventListener('input', ({ target }) => {
		const { name, type, value, checked } = target;
		formData[name] = type === 'checkbox' ? checked : value;
		console.log(formData);
	});
}

//We could use hard-coded callbacks:
// creditCardInput.addEventListener('input', (e) => {
// 	console.log('CC CHANGED!', e);
// 	formData['cc'] = e.target.value;
// });

// veggieSelect.addEventListener('input', (e) => {
// 	console.log('VEGGIE!', e);
// 	formData['veggie'] = e.target.value;
// });

// termsCheckbox.addEventListener('input', (e) => {
// 	console.log('CHECKBOX', e);
// 	formData['agreeToTerms'] = e.target.checked;
// });
