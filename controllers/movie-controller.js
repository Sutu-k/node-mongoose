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
    Movie.findById(req.params.id, function (err, movie) {
      if (err) {
        res.send(err);
      }
      res.json(movie);
    })
  },
  readOneMovie(req, res) {
    Movie.findOne({ id: req.params.id }, function (err, movie) {
      if (err) {
        res.send(err);
      }
      res.json(movie);
    })
  },
  searchMovies(req, res) {
    Movie.find({
      'original_title': {
        $regex: `.*${req.params.searchStr}.*`,
        $options: 'i'
      }
    }).limit(10)
      .exec(function (err, docs) { console.log(docs); res.json(docs); });
    /* Movie.find({
      $text: {
        $search: req.params.searchStr
      }
    }, function (err, docs) {
      if (err) {
        res.send(err);
      }
      res.json(docs);
    }) */
    /* Movie.find({ $text: { $search: req.params.searchStr } })
      //.skip(20)
      .limit(5)
      .exec(function (err, docs) { console.log(req.params.searchStr); console.log(docs); res.json(docs); }); */
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