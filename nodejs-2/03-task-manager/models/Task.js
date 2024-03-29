const mongoose = require('mongoose');

// a schema defines the structure for the document in a collection
// Strings and Boolean are SchemaTypes
// NOTE: only the properties setup in the schema will be passed to the database
const TaskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'just provide name'],
		trim: true,
		maxlength: [20, 'name can not be more than 20 characters']
	},
	completed: {
		type: Boolean,
		default: false
	}
});

// the .model() method makes a copy of TaskSchema
// 1st arg is the name of the collection
// 2nd arg is the schema
module.exports = mongoose.model('Task', TaskSchema);
