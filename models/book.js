const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    author: {
		type: String,
		default: ""
	},
    title: {
		type: String,
		default: ""
	},
    pages: {
		type: Number,
		min: 1,
		max: 99999,
		default: 100,
	},
    genre: {
		type: String,
		default: ""
	},
	
}, {timestamps: true});

module.exports = mongoose.model('Book', bookSchema)