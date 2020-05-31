import React, { Component } from 'react';
import SearchBox from '../components/search';
import Bloodhound from 'bloodhound-js'
import Card from '../components/card';
import $ from 'jquery'
import '../styles/main.scss';

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movieID: 157336 // set initital load movie - Interstellar
    }
  }

  render() {
    return (
      <div>
        <SearchBox
          fetchMovieID={this.fetchMovieID.bind(this)}
        />
        <Card data={this.state} />
      </div>
    )
  } // END render

  // the api request function
  fetchApi(url) {

    fetch(url).then((res) => res.json()).then((data) => {
      console.log(data)
      // update state with API data
      this.setState({
        movieID: data.id,
        original_title: data.original_title,
        tagline: data.tagline,
        overview: data.overview,
        homepage: data.homepage,
        poster: data.poster_path,
        production: data.production_companies,
        production_countries: data.production_countries,
        genre: data.genres,
        release: data.release_date,
        vote: data.vote_average,
        runtime: data.runtime,
        revenue: data.revenue,
        backdrop: data.backdrop_path

      })
    })

    // .catch((err) => console.log('Movie not found!'))

  } // end function

  fetchMovieID(movieID) {
    let url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`
    this.fetchApi(url)
  } // end function

  componentDidMount() {
    let url = `https://api.themoviedb.org/3/movie/${this.state.movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`
    this.fetchApi(url)

    //========================= BLOODHOUND ==============================//
    let suggests = new Bloodhound({
      datumTokenizer: function (datum) {
        return Bloodhound.tokenizers.whitespace(datum.title);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: 'https://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=cfe422613b250f702980a3bbf9e90716',
        wildcard: '%QUERY',
        filter: function (movies) {
          // Map the remote source JSON array to a JavaScript object array
          return $.map(movies.results, function (movie) {
            return {
              title: movie.original_title, // search original title
              id: movie.id // get ID of movie simultaniously
            };
          });
        } // end filter
      } // end remote
    }); // end new Bloodhound

    suggests.initialize(); // initialise bloodhound suggestion engine

    //========================= END BLOODHOUND ==============================//

    //========================= TYPEAHEAD ==============================//
    // Instantiate the Typeahead UI
    $('.typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 2
    },
      {
        source: suggests.ttAdapter(),
        displayKey: function (movie) {
          return movie.title
        },
      }).on('typeahead:selected', function (obj, datum) {
        this.fetchMovieID(datum.id)
      }.bind(this)); // END Instantiate the Typeahead UI
    //========================= END TYPEAHEAD ==============================//

  } // end component did mount function

  // } // END CLASS - APP
}

export default Home;