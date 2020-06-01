const User = require('../models/users');
const createToken = require("../auth/auth").createToken;

module.exports = {
	readUsers(req, res) {
		User.find(function (err, users) {
			if (err) {
				res.send(err);
			}
			res.json(users);
		})
	},
	readUser(req, res) {
		User.findById(req.params.id, function (err, user) {
			if (err) {
				res.send(err);
			}
			res.json(user);
		})
	},
	readUserEmail(req, res) {
		User.findOne({ email: req.params.email }, function (err, user) {
			if (err) {
				res.send(err);
			}
			res.json(user);
		})
	},
	createUser(req, res) {
		const user = new User(req.body);

		user.save(function (err) {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'Congratulation, the user is now in database' });
		});
	},
	updateUser(req, res) {
		User.findByIdAndUpdate(req.params.id, req.body, function (err) {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'Congratulation, the user is now update' });
		})

	},
	dislikeMovie(req, res) {
		User.findByIdAndUpdate(req.params.id, req.body, function (err) {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'Congratulation, the user is now update' });
		})

	},
	allMovies(req, res) {
		User.findById(req.params.id, function (err, user) {
			if (err) {
				res.send(err);
			}
			res.json(user.movies);
		})
	},

	registerUser(req, res) {
		const user = new User(req.body);
		user.register().then(data => {
			console.log(data)

			const token = createToken({
				firstName: data.firstname,
			});

			res.status(201).send({ token });

		}).catch(error => {
			res.status(400).send("[register] Invalid token");
		});

		console.log("Register...");
	},

	userLogin(req, res) {
		User.login(req.body.email, req.body.password)
			.then(user => {
				const token = createToken({
					firstName: user.firstname,
					email: user.email
				});

				res.status(201).send({ token, user });
			})
			.catch(error => {
				console.log(error)
				res.status(400).send("Invalid token");
			});

		console.log("Login...");
	},

	deleteUser(req, res) {
		User.findByIdAndRemove(req.params.id, function (err) {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'Congratulation, the user is now delete' });
		})
	}
}