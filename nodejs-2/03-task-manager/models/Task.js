const mongoose = require('mongoose');

// a schema defines the structure for the document in a collection
// Strings and Boolean are SchemaTypes
const TaskSchema = new mongoose.Schema({
	name: String,
	completed: Boolean
});

// the .model() method makes a copy of TaskSchema
// 1st arg is the name of the collection
// 2nd arg is the schema
module.exports = mongoose.model('Task', TaskSchema);
