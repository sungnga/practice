const fs = require('fs');
const crypto = require('crypto');

module.exports = class Repository {
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
    
    // create() method that creates all generic records
    async create(attrs) {
        // Assign a random id to the attributes
        attrs.id = this.randomId();

        // Get all the records and assign it to records variable
        const records = await this.getAll();
        // Add in the new record
        records.push(attr);
        // Write all the records
        await this.writeAll(records);

        return attrs;
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