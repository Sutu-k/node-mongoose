UserController = require('../controllers/user-controller');
MovieController = require('../controllers/movie-controller');
Security = require('../middlewares/security');
const verifyToken = require('../middlewares/security');

module.exports = (server) => {
	server.get('/movies', MovieController.readMovies);
	server.get('/movie/:id', MovieController.readMovie);

	server.get('/search/:id', MovieController.readOneMovie);
	server.get('/searchs/:searchStr', MovieController.searchMovies);
	server.post('/movie', MovieController.createMovie);
	server.get('/users', UserController.readUsers);
	server.get('/user/:id', UserController.readUser);
	server.get('/search/user/:email', UserController.readUserEmail);
	server.get('/user/:id/movies', UserController.allMovies);
	server.post('/user', UserController.createUser);
	server.post('/register', UserController.registerUser);
	server.post('/login/', UserController.userLogin);
	server.put('/user/:id', UserController.updateUser);
	server.delete('/user/:id', UserController.deleteUser);

	server.use(verifyToken)
	server.post('/movies/:id/like', MovieController.likeMovie);
	server.post('/movies/:id/dislike', MovieController.dislikeMovie);
}