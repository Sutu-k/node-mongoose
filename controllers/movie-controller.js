const assert = require('assert');
const Movie = require('../models/movies');

module.exports = {
  readMovies(req, res) {
    Movie.find(function (err, movies) {
      if (err) {
        res.send(err);
      }
      res.json(movies);
    })
  },
  readMovie(req, res) {
    Movie.findById(req.params._id, function (err, movie) {
      if (err) {
        res.send(err);
      }
      res.json(movie);
    })
  },
  createMovie(req, res) {
    const movie = new Movie(req.body);

    movie.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Congratulation, the movie is now in database' });
    });
  }
}