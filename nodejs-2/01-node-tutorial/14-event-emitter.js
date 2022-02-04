// get back the class from the events module
// if want custom extend from class
// otherwise just for emitting and handling events create instance
const EventEmitter = require('events');

const customEmitter = new EventEmitter();

// the on() and emit() methods
// the order when these methods are called is important
// additional arguments
// built-in modules utilize it all the time
// response is the name of the event
// the callback function is where we write the logic of what to do with the data
customEmitter.on('response', (name, id) => {
	console.log(`data received user ${name} with id:${id}`);
});

customEmitter.on('response', () => {
	console.log('some other logic here');
});

customEmitter.emit('response', 'john', 34);
