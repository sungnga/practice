const fs = require('fs');
const crypto = require('crypto');
const util = require('util');

// A version of a function that returns a promise
const scrypt = util.promisify(crypto.scrypt);

class UsersRepository {
    constructor(filename) {
        if (!filename) {
            throw new Error('Creating a repository requires a filename')
        }

        this.filename = filename;
        // Check to see if this file exists. If it doesn't, we want to write the file
        // We're using accessSync() because we're not allowed to have async code inside the constructor. And also we're only expecting to create one UserRepository inside our application
        try {
            fs.accessSync(this.filename);
        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
        }
    }   

    // Get a list of all users
    async getAll() {
        // CONDENSED VERSION
        return JSON.parse(
            await fs.promises.readFile(this.filename, {
                encoding: 'utf8'
            })
        )

        // ============
        // LONG VERSION
        // ============
        // Open the file called this.filename
        //const contents = await fs.promises.readFile(this.filename, { encoding: 'utf8' });
        // Read its contents
        //console.log(contents)
        // Parse the contents
        //const data = JSON.parse(contents);
        // Return the parsed data
        //return data;
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

    // Writes all users to a users.json file
    async writeAll(records) {
        // Write the updated 'records' array back to this.filename
        // The 2nd arg of stringify() is custom formatter. The 3rd arg is the level of indentation to use
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2))
    }

    // Generate a random Id
    randomId() {
        return crypto.randomBytes(4).toString('hex');
    }

    // Finds the user with the given Id
    async getOne(id) {
        // Get all the records from getAll() method
        const records = await this.getAll();
        // Iterate through the records and return the first match to the given Id
        return records.find(record => record.id === id);
    }

    // Delete the user with the given Id
    async delete(id) {
        const records = await this.getAll();
        // Return true only if the record.id is NOT the same as id
        const filteredRecords = records.filter(record => record.id !== id);
        // Pass the filteredRecords back to the json file
        await this.writeAll(filteredRecords);
    }

    // Updates the user with the given id using the given attribute
    async update(id, attrs) {
        const records = await this.getAll();
        // Find the record with the matching id
        const record = records.find(record => record.id === id);

        if (!record) {
            throw new Error(`Record with id ${id} not found`)
        }
        // Update the found record with the given attributes
        Object.assign(record, attrs);
        await this.writeAll(records);
    }

    // Finds one user with the given filters
    async getOneBy(filters) {
        const records = await this.getAll();

        // Iterating through an ARRAY
        for (let record of records) {
            let found = true;
            // Iterating through an OBJECT
            for (let key in filters) {
                // If the filter key does not match with the key in record, set found to false
                if (record[key] !== filters[key]) {
                    found = false;
                }
            }
            // If found is still true, return the record
            if (found) {
                return record;
            }
        }
    }
}

module.exports = new UsersRepository('users.json');
