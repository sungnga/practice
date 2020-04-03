const fs = require('fs');
const crypto = require('crypto')

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
    async create(attrs) {
        // Assign user id with the random ID generated
        attrs.id = this.randomId()
        // Get the existing list of users
        const records = await this.getAll();
        // Add the new user
        records.push(attrs);
        
        await this.writeAll(records)
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
}

const test = async () => {
    // Access to our users repository
    const repo = new UsersRepository('user.json');
    // Save a record to it
    // create() function is an async function
    await repo.create({ email: 'test@test.com', password: 'password' })
    // Get all the records we have saved
    // Whatever we get back from getAll() assign it to users
    const users = await repo.getAll();
    // Console log them out
    // The return of users should now be an array object
    console.log(users)
};

test()
