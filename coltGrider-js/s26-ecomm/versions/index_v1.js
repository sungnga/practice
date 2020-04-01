const express = require('express');
const bodyParser = require('body-parser');

// app describes all the things our web server can do
const app = express();

//by using this outside library, every single different route handler will automatically be body-parsed for us
//will be using use() function a lot whenever we want to wire up middleware inside the app
app.use(bodyParser.urlencoded({ extended: true }));

// *****************************
// ROUTE HANDLER
// *****************************
//route handler: telling the server what it should do when it receives a request coming from the web browser
//the 2nd arg is a callback function that always receives a req & res
//req stands for request, an object that represents the incoming request from a web browser into our web server
//res stands for response, an object that represents the response from the server back to the browser
app.get('/', (req, res) => {
    //by default, the browser makes request to the server using the GET method. Overwriting the method with POST
    //a POST method is associated with creating a record
    //with POST method, the data is not stored in the URL, but instead in the request body called Form Data
    //the name attribute in input creates a key associated with its value
    res.send(`
        <div>
            <form method="POST">
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <input name="passwordConfirmation" placeholder="password confirmation" />
                <button>Sign Up</button>
            </form>
        </div>
    `);
});

// *****************************************
// Middleware helper function done manually
// *****************************************
//manually writing out middleware, but outside libraries work much better than this
// const bodyParser = (req, res, next) => {
//     //check to see if the request method is POST. Method is a property inside req object that we have access to
//     if (req.method === 'POST') {
//         //think of req like the html element in the browser
//         //and the on() method is like the addEventListener() method
//         //we want to run some callback function when some event occurs
//         //the event we're waiting for is called the 'data' event
//         //the req object emits 'data' event everytime it receives some bits of data
//         //that data gets passed to the callback function. This data is a buffer object: an array-like of raw information
//         req.on('data', data => {
//             //convert the raw data into a string representation
//             const parsed = data.toString('utf8').split('&');
//             //parse the data manually into object
//             const formData = {};
//             for (let pair of parsed) {
//                 const [key, value] = pair.split('=');
//                 formData[key] = value;
//             }
//             req.body = formData;
//             next();
//         })
//     } else {
//         //a callback function which is given to us by express, saying we are all done with processing and it can continue with whatever it wants to do
//         next();
//     }  
// }

//ROUTE HANDLER
//this is telling our route to watch for incoming requests with the path of '/' and a method of POST. If it sees that, it's going to run the call back function
//the browser took the form info from above and made a post request to the same route that it was visiting
//the server saw the incoming request of POST and the path, then ran the callback function
//think of middlewares (the bodyParser helper function) essentially as functions in the middle of a request handler. We can have many different middlewares wired up to one single request handler. With the help of outside middleware libraries, we don't need to pass the middleware into the route handler anymore
app.post('/', (req, res) => {
    //to see the req object w/ its properties
    console.log(req.body)
    res.send('Account created!!!!');
});

app.listen(3000, () => {
    console.log('Listening');
});