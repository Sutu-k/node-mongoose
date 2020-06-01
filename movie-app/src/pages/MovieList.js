import React, { Component } from 'react'
import Movie from '../components/Movie'
import { withRouter } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalProvider'

class MovieList extends Component {
  static contextType = GlobalContext


  constructor(props) {
    super(props)
    this.state = {
      user: JSON.parse(localStorage.getItem('user'))
    }
  }

  componentDidMount() {
    if (!this.context.selectors.isLogged()) {
      this.props.history.push('/')
    }
  }

  goBackHome = () => {
    this.props.history.push('/')
  }

  render() {
    return <>
      <div className="container">
        <div className="row mb-4 mt-4">
          <div className="col-12">
            <ion-icon size="large" name="arrow-back" title="Go back home" onClick={this.goBackHome}></ion-icon>
          </div>
        </div>
      </div>

      <div>
        {this.state.user.movies.map(movie => {
          let movieX = {
            movieID: movie.id,
            original_title: movie.original_title,
            tagline: movie.tagline,
            overview: movie.overview,
            homepage: movie.homepage,
            poster: movie.poster_path,
            production: movie.production_companies,
            production_countries: movie.production_countries,
            genre: movie.genres,
            release: movie.release_date,
            vote: movie.vote_average,
            runtime: movie.runtime,
            revenue: movie.revenue,
            backdrop: movie.backdrop_path
          }
          return <Movie data={movieX} />
        })}
      </div>
    </>
  }
}


export default withRouter(MovieList)