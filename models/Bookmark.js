const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId
	},
	name: {
		type: string,
		required: true
	},
	url: {
		type: string,
		required: true
	},
	tag: {
		type: string,
		required: true
	}
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);
