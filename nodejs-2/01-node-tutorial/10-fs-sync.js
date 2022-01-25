// destructure the methods we want to use out of the fs module
const { readFileSync, writeFileSync } = require('fs');
// console.log('start')

// readFileSync() is a method that reads files
// 1st arg is the file path
// 2nd arg is the encoding option
const first = readFileSync('./content/first.txt', 'utf8');
const second = readFileSync('./content/second.txt', 'utf8');
console.log(first, second);

// WriteFileSync() is a method that writes a file
// 1st arg is the name of file. If it doesn't exist, Node will create one
// 2nd arg is the value. By default, if the file already exists, it'll overwrite the value
// 3rd arg is a flag object to appending a value instead of overwriting it
writeFileSync(
	'./content/result-sync.txt',
	`Here is the result: ${first}, ${second} `,
	{ flag: 'a' }
);
