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
	read(req, res) {
		res.send({ user: 'Un user avec le numero ' + req.params.numero });
	},
	create(req, res) {
		const body = req.body;
		console.log(body);
	},
	updateOne(req, res) {
		const body = req.body;
		console.log(body);
	},
	deleteOne(req, res) {
		const body = req.body;
		console.log(body);
	}
}