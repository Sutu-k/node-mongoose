const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
	title: { type: String },
	createdAt: Date,
	year: {
		type: Number,
		min: 1900
	},
	genre: {
		type: String
	},
	duration: {
		type: Number
	}
});

MovieSchema.methods.onScreen = function () {
	return Date.now() > new Date(`${this.year}-01-01`);
}

MovieSchema.pre('save', function (next) {
	console.log(`Saving ${this.title} ...`);
	next();
});


MovieSchema.post('save', function (movie) {
	console.log(`${movie.title} saved.`)
});

const Movie = mongoose.model('movie', MovieSchema);
module.exports = Movie;