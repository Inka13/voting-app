const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const pollSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	question:  { type : String , required : true },
	options:  [{}],
	posted_by: { type: mongoose.Schema.Types.ObjectId, ref : 'User'},
	posted_on: Date,
	voters: [ {type: String}],
	votes: { type: Number, default: 0}
});

module.exports = mongoose.model('Poll', pollSchema);
