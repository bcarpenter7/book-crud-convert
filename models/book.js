const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    author: {
		type: String,
		required: false,
		default: ""
	},
    title: {
		type: String,
		required: false,
		default: ""
	},
    pages: {
		type: Number,
		min: 1,
		max: 99999,
		default: 100,
		required: false
	},
    genre: {
		type: String,
		required: false,
		default: ""
	},
	
}, {timestamps: false});

module.exports = mongoose.model('Book', bookSchema)