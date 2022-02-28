const express = require('express');
const app = express();
// destructure people array from data.js file
let { people } = require('./data');

app.get('/api/people', (req, res) => {
	res.status(200).json({ success: true, data: people });
});

app.listen(5000, () => {
	console.log('Server is listening on port 5000');
});

// ------ HTTP METHODS ------
// app.get - read data - get data
// app.post - insert data - send data
// app.put - update data - path params + send data
// app.delete - delete data - path params

// app.all - handles all http methods
// app.use - responsible for middleware
// app.listen - the port the server is listening on
