const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

// app describes all the things our web server can do
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['ldkjflksajdfierwjdsalfj']
}));

// ROUTE HANDLER
app.get('/signup', (req, res) => {
    res.send(`
        <div>
            Your id is: ${req.session.userId}
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
app.post('/signup', async (req, res) => {
    // req.body contains the object with properties from form element above
    console.log(req.body)
    const { email, password, passwordConfirmation } = req.body;

    const existingUser = await usersRepo.getOneBy({ email });
    
    // If a user is defined
    if (existingUser) {
        return res.send('Email is use');
    }

    if (password !== passwordConfirmation) {
        return res.send('Passwords must match');
    }

    // Create a user in our user repo to represent this person
    const user = await usersRepo.create({ email, password });
    
    // Store the id of that user inside the users cookie
    // The additional property that gets added in to the req object is the session property. Added by the cookie session library
    // The session property is an object and any information inside there will be maintained by the cookie session
    req.session.userId = user.id;

    res.send('Account created!!!!');
}); 

app.get('/signout', (req, res) => {
    // Clear out all the information stored in the cookie session
    req.session = null;
    res.send('You are logged out')
})

app.get('/signin', (req, res) => {
    res.send(`
        <div>
            <form method="POST">
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <button>Sign In</button>
            </form>
        </div>
    `)
})

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await usersRepo.getOneBy({ email });

    if (!user) {
        return res.send('Email not found');
    }

    if (user.passord !== password) {
        return res.send('Invalid password');
    }

    res.session.userId = user.id;

    res.send('You are signed in!!!')
})

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