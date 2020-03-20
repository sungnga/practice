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


// ========================
// The Impossible Button Demo
// ========================



// ========================
// Events on Multiple Elements
// ========================



// ========================
// The Event Object
// ========================



// ========================
// Key Events: keypress, keyup & keydown
// ========================



// ========================
// Coin Game Demo
// ========================




// ========================
// Form Events & PreventDefault
// ========================



// ========================
// Input & Change Events
// ========================