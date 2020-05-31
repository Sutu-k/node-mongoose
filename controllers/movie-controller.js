const assert = require('assert');
const Movie = require('../models/movies');
const User = require('../models/users');

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
  },
  likeMovie(req, res) {

    User.findOne({ email: req.user.email }).then((user) => {

      Movie.findOne({ id: req.params.id }).then((movie) => {
        if (user.movies.filter(e => e.id === movie.id).length > 0) {
          res.status(400).json({ 'message': 'user has already liked' });
        } else {
          console.log(user)
          user.movies.push(movie)


          user.save()
            .then(data => {
              res.status(200).send(movie)
            }).catch(error => {
              console.log(error)
              if (error.name === 'ValidationError') {
                res.status(400).json(error.errors);
              } else {
                res.sendStatus(500);
              }
            });
        }
      });
    }).catch((error) => {
      console.log("Error===<", error);
      res.sendStatus(500);
    });
  },
}