const express = require('express');

// app describes all the things our web server can do
const app = express();

//route handler: telling the server what it should do when it receives a request coming from the web browser
//the 2nd arg is a callback function that always receives a req & res
//req stands for request, an object that represents the incoming request from a web browser into our web server
//res stands for response, it represents the response from the server back to the browser
app.get('/', (req, res) => {
    res.send('hi there!');
});

app.listen(3000, () => {
    console.log('Listening');
});