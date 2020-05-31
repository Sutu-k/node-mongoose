const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
	id: Number,
	original_title: {
		type: String,
		required: true,
		minlength: 0
	},
	tagline: String,
	overview: String,
	genres: Array,
	production_companies: Array,
	production_countries: Array,
	release_date: Date,
	runtime: Number,
	revenue: Number,
	vote_average: Number,
	poster_path: String,
	backdrop_path: String
});

/* MovieSchema.index({
	original_title: 'text'
	//tagline: 'text',
	//overview: 'text'
}); */

MovieSchema.methods.onScreen = function () {
	return Date.now() > new Date(`${this.year}-01-01`);
}

MovieSchema.pre('save', function (next) {
	console.log(`Saving ${this.original_title} ...`);
	next();
});


MovieSchema.post('save', function (movie) {
	console.log(`${movie.original_title} saved.`)
});

const Movie = mongoose.model('movie', MovieSchema);
module.exports = Movie;