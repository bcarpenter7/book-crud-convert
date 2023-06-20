const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    author: {
		type: String,
		required: true
	},
    title: {
		type: String,
		required: true
	},
    pages: {
		type: Number,
		min: 1,
		max: 99999,
		default: 100,
		required: true
	},
    genre: {
		type: String,
		required: true
	},
	
}, {timestamps: true});

module.exports = mongoose.model('Book', bookSchema)