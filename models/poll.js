const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const pollSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	question:  { type : String , required : true },
	options:  { type: [String], required : true },
	posted_by: { type: String, required : true },
	posted_by_id: { type: mongoose.Schema.Types.ObjectId},
	posted_on: Date,
	voters: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('Poll', pollSchema);