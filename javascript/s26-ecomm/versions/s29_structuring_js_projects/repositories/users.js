const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

// A version of a function that returns a promise
const scrypt = util.promisify(crypto.scrypt);

// Extends the Repository class
class UsersRepository extends Repository {
    // Saved -> password saved in our database. 'hashed.salt'
    // Supplied -> password given to use by a user trying to sign in
    async comparePasswords(saved, supplied) {
        // LONG VERSION
        // Result is an array with 2 elements in it returned from split() that was called on saved object
        // const result = saved.split('.');
        // const hashed = result[0];
        // const salt = result[1];
        
        // COMPACT VERSION
        // Destructure the array that you get back from split(). Reach into the array and assign the first element to the variable hashed and the second element to the variable call salt
        // NOTE that when putting a square bracket on the left hand side of =, we're not creating a new array, we're destructuring - reaching into the array and pull some values out of it
        const [hashed, salt] = saved.split('.');
        const hashedSuppliedBuffer = await scrypt(supplied, salt, 64);

        // Compare the saved hashed password with the supplied hashed
        // Turn the supplied buffer into string representation
        return hashed === hashedSuppliedBuffer.toString('hex');
    }

    // Create a new user
    // attrs = { email: '', password: '' }
    async create(attrs) {
        // Assign user id with the random ID generated
        attrs.id = this.randomId()

        // Generate a salt
        const salt = crypto.randomBytes(8).toString('hex');

        // The callback function of scrypt() takes in an err and a buffer. A buffer is the derivedKey that has the hashed password inside it. A Buffer is an array-like object that has raw data
        // Turn this callback function into a promise-based function using the promisify() function from util library. Since the callback function is promisified now, we just use the 'await' keyword to wait for that hash to be generated and leave out the callback function here. Then store the output as buffer variable
        const buffer = await scrypt(attrs.password, salt, 64);

        // Get the existing list of users
        const records = await this.getAll();
        
        // Create a new object, take all the properties out of attrs object, overwrite the existing property with this new password
        const record = {
            ...attrs,
            password: `${buffer.toString('hex')}.${salt}`
        }
        
        // Add/push the new user record into records
        records.push(record);
        
        // Write all of the data to the user.json file
        await this.writeAll(records);

        return record;
    }
}

module.exports = new UsersRepository('users.json');
