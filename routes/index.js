UserController = require('../controllers/user-controller');
MovieController = require('../controllers/movie-controller');
module.exports = (server) => {
	server.get('/movies', MovieController.readMovies);
	server.get('/movie/:_id', MovieController.readMovie);
	server.post('/movie', MovieController.createMovie);
	server.get('/users', UserController.readUsers);
	server.get('/user/:numero', UserController.read);
	server.post('/user', UserController.create);
}