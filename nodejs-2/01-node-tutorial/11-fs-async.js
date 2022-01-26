// An async function returns an error or a result
// We can do something with the result that we get back in a callback function

// readFile() and writeFile() methods are an ASYNC functions from the fs module
const { readFile, writeFile } = require('fs');

// 1st arg is the path of the file
// 2nd arg is the encoding value. If we don't provide, it'll return the buffer
// 3rd arg is the callback function
readFile('./content/first.txt', 'utf8', (err, result) => {
	if (err) {
		console.log(err);
		return;
	}
	// console.log(result);

  const first = result;
  
	readFile('./content/second.txt', 'utf8', (err, result) => {
		if (err) {
			console.log(err);
			return;
		}
    const second = result;
    
		// 1st arg the file path to write to. If it doesn't exist, Node will create one
		// 2nd arg is the values to write to
		// 3rd arg is the callback function
		// When this file runs, a new file called result-async.txt will be created in the content folder
		writeFile(
			'./content/result-async.txt',
			`Here is the result: ${first}, ${second} `,
			(err, result) => {
				if (err) {
					console.log(err);
					return;
				}
				console.log(result);
			}
		);
	});
});
