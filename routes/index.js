UserController = require('../controllers/user-controller');
MovieController = require('../controllers/movie-controller');
module.exports = (server) => {
	server.get('/movies', MovieController.readMovies);
	server.get('/movie/:id', MovieController.readMovie);
	server.post('/movie', MovieController.createMovie);
	server.get('/users', UserController.readUsers);
	server.get('/user/:id', UserController.readUser);
	server.post('/user', UserController.createUser);
	server.put('/user/:id', UserController.updateUser);
	server.delete('/user/:id', UserController.deleteUser);
}