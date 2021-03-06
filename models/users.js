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
}, {
	usePushEach: true
});

UserSchema.pre('save', function (next) {

	const user = this;
	if (!user.isModified('password')) return next();

	bcrypt.genSalt(10).then(salt => {
		bcrypt.hash(this.password, salt).then(hash => {
			this.password = hash;
			next();
		})
	});
	console.log(`Saving ${this.firstname} ...`);
});

UserSchema.methods = {
	register: function () {
		return this.save();
	}
}

UserSchema.statics = {
	login: function (email, password) {
		return new Promise((resolve, reject) => {
			User.findOne({ 'email': email }).populate('movies').then(user => {
				if (!user) return reject('User not found')
				bcrypt.compare(password, `${user.password}`).then(res => res ? resolve(user) : reject('Wrong password'));
			})
		});
	}
}

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