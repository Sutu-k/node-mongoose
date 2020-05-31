const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Movie = require('./movies');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
	firstname: String,
	lastname: String,
	age: {
		type: Number,
		min: 14
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: true,
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
	},
	password: {
		type: String,
		required: true,
	},
	gender: String,
	movies: [{
		type: Schema.Types.ObjectId,
		ref: 'movie'
	}]
});

UserSchema.pre('save', function (next) {
	bcrypt.genSalt(10).then(salt => {
		bcrypt.hash(this.password, salt).then(hash => {
			this.password = hash;
			next();
		})
	});
	console.log(`Saving ${this.firstname} ...`);
});

UserSchema.virtual('countMovies').get(function () {
	return this.movies.length;
})

UserSchema.pre('remove', function (next) {
	Movie.remove({ _id: { $in: this.movies } }).then(() => {
		next();
	})
})

UserSchema.post('save', function (user) {
	console.log(`${user.firstname} ${user.lastname} saved.`);
});

const User = mongoose.model('user', UserSchema);
module.exports = User;