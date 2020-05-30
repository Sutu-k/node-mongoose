var mongoose = require('mongoose');
const moviesData = require('./data/movieData')
const usersData = require('./data/userData')
const User = require('./models/users');
const Movie = require('./models/movies');

// make a connection
mongoose.connect('mongodb://localhost/user_api_database');

// get reference to database
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log("Connection Successful!");

  let movies = []
  // documents array
  for (let i in moviesData) {
    let movie = new Movie(moviesData[i]);
    movie.save()
    movies.push(movie)
  }

  for (let i in usersData) {
    let user = new User(usersData[i]);

    // get randomly 2 movies
    const movie1 = movies[Math.floor(Math.random() * movies.length)];
    const movie2 = movies[Math.floor(Math.random() * movies.length)];
    user.movies.push(movie1)
    user.movies.push(movie2)

    user.save()
  }


});