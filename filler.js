var mongoose = require('mongoose');
const moviesData = require('./data/movieData')
const usersData = require('./data/userData')
const User = require('./models/users');
const Movie = require('./models/movies');
//requiring path and fs modules
const path = require('path');
const fs = require('fs');

// make a connection
mongoose.connect('mongodb://localhost/user_api_database');

// get reference to database
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log("Connection Successful!");

  //
  // ─── CLEAN DATABASE ─────────────────────────────────────────────────────────────
  //
  // db.dropCollection('users', function(err, _) {
  //   if(err) {
  //     console.log('Drop with error')
  //   }
  //   console.log('Drop with success')
  // });

  // db.dropCollection('movies', function(err, _) {
  //   if(err) {
  //     console.log('Drop with error')
  //   }
  //   console.log('Drop with success')
  // });
  // // db.users.drop()
  // // db.movies.drop()

  //
  // ─── INSERT ALL MOVIES ──────────────────────────────────────────────────────────
  //

  let movies = []

  // joining path of directory
  const moviesPath = path.join(__dirname, 'data/movies');
  // passsing moviesPath and callback function
  fs.readdir(moviesPath, function (err, files) {
    // handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    // listing all files using forEach
    for (let i in files) {
      let file = files[i];

      // Do whatever you want to do with the file
      let rawdata = fs.readFileSync(`${moviesPath}/${file}`);
      let jsonMovie = JSON.parse(rawdata);

      let movie = new Movie();
      movie.id = jsonMovie.id
      movie.original_title = jsonMovie.original_title
      movie.tagline = jsonMovie.tagline
      movie.overview = jsonMovie.overview

      for (let i in jsonMovie.genres) {
        movie.genres.push(jsonMovie.genres[i].name)
      }

      for (let i in jsonMovie.production_companies) {
        movie.production_companies.push(jsonMovie.production_companies[i].name)
      }

      for (let i in jsonMovie.production_countries) {
        movie.production_countries.push(jsonMovie.production_countries[i].name)
      }

      movie.release_date = jsonMovie.release_date
      movie.runtime = jsonMovie.runtime
      movie.revenue = jsonMovie.revenue
      movie.vote_average = jsonMovie.vote_average
      movie.poster_path = jsonMovie.poster_path
      movie.backdrop_path = jsonMovie.backdrop_path
      movie.save()
      movies.push(movie)
    }

    //
    // ─── INSERT ALL USERS WITH PREFERRED MOVIES ─────────────────────────────────────
    //

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
});