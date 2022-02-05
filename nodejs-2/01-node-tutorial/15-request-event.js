const http = require('http');

// const server = http.createServer((req, res) => {
//   res.end('Welcome')
// })

// Using Event Emitter API
const server = http.createServer();
// behind the scenes, server emits the request event
// then we can subscribe to it / listen for it / respond to it using the .on() method
server.on('request', (req, res) => {
	res.end('Welcome');
});

server.listen(5000);
