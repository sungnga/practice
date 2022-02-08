var http = require('http');
var fs = require('fs');

http
	.createServer(function (req, res) {
		// reading and sending a big file size is not effective
		// const text = fs.readFileSync('./content/big.txt', 'utf8')
		// res.end(text)

		// refactor to using createReadStream()
		const fileStream = fs.createReadStream('./content/big.txt', 'utf8');
    fileStream.on('open', () => {
			// the pipe() method is pushing the read stream into the write stream
			fileStream.pipe(res);
		});
		fileStream.on('error', (err) => {
			res.end(err);
		});
	})
	.listen(5000);
