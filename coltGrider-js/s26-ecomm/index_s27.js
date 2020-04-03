const express = require('express');
const bodyParser = require('body-parser');

// app describes all the things our web server can do
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// ROUTE HANDLER
app.get('/', (req, res) => {
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

//ROUTE HANDLER
app.post('/', (req, res) => {
    console.log(req.body)
    res.send('Account created!!!!');
});

app.listen(3000, () => {
    console.log('Listening');
});



// *************************************************
// OBJECTIVE: LEARN TO WRITE DATA STORE FROM SCRATCH
// *************************************************
// This is not good use for real-life production. Here's why:
// Will error if we try to open/write to the same file twice at the same time
// Wont work if we have multiple servers running on different machines
// We have to write to the FS every time we want to update some data
// Nonetheless, it is a good exercise when learning Javascript! 