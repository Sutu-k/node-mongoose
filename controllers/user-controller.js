const User = require('../models/users');

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
	deleteUser(req, res) {
		User.findByIdAndRemove(req.params.id, function (err) {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'Congratulation, the user is now delete' });
		})
	}
}