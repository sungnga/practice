const { createReadStream } = require('fs');

// create a stream instance
// default 64kb
// last buffer - remainder
// highWaterMark - control size
// const stream = createReadStream('./content/big.txt', { highWaterMark: 90000 })
// const stream = createReadStream('../content/big.txt', { encoding: 'utf8' })
const stream = createReadStream('./content/big.txt', {
	highWaterMark: 90000,
	encoding: 'utf8'
});

// the .on() method extends from the events module
// the .on() method listens or subscribes to the data
// data is the name of the event we're listening to
stream.on('data', (result) => {
	console.log(result);
});
stream.on('error', (err) => console.log(err));
