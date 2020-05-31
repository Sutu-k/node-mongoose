import React, { Component } from 'react';
import { GlobalContext } from '../context/GlobalProvider'

let numeral = require('numeral');
let backdropIMG;

class Card extends Component {
  static contextType = GlobalContext

  handleLike = () => {
    
    if (this.context.selectors.isLogged()) {
      this.context.actions.like(this.props.data.movieID).then(()=> {
        alert('reussi')
      })
    } else {
      this.props.history.push('/authentication');
    }
  }

  render() {

    let data = this.props.data
    // if movie ID found, then...

    let posterIMG = 'https://image.tmdb.org/t/p/w500' + data.poster,
      production = data.production,
      productionCountries = data.production_countries,
      genres = data.genre,
      totalRevenue = data.revenue,
      productionList = nestedDataToString(production),
      productionCountriesList = nestedDataToString(productionCountries),
      noData = '-',
      genresList = nestedDataToString(genres);
    backdropIMG = 'https://image.tmdb.org/t/p/original' + data.backdrop;
    let formatRelease = formatDate(data.release);


    // conditional statements for no data
    if (data.vote === 'undefined' || data.vote === 0) {
      data.vote = noData
    } else {
      data.vote = data.vote + ' / 10'
    };

    if (totalRevenue === 'undefined' || totalRevenue === 0) {
      totalRevenue = noData
    } else {
      totalRevenue = numeral(data.revenue).format('($0,0)');
    };

    if (data.poster == null) {
      posterIMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g';
    }

    return (
      <div className="container cardcont">

        <div className="row flex-column-reverse flex-md-row">
          <div className="poster-container nopadding col-xs-12 col-md-4 pull-md-8 col-lg-5 pull-lg-7 ">
            <img id="postertest" className='poster' src={posterIMG} alt={data.original_title} />
          </div>

          <div className="meta-data-container col-xs-12 col-md-8 push-md-4 col-lg-7 push-lg-5">
            <h1>{data.original_title}</h1>

            <span className="tagline">{data.tagline}</span>
            <p>{data.overview}</p>

            <div className="additional-details">
              <span className="genre-list">{genresList}</span>
              <span className="production-list">{productionList}</span>
              <span className="countries-list">{productionCountriesList}</span>

              <div className="row nopadding release-details">
                <div className="col-6"> Original Release: <span className="meta-data">{formatRelease}</span></div>
                <div className="col-6"> Running Time: <span className="meta-data">{data.runtime} mins</span> </div>
                <div className="col-6"> Box Office: <span className="meta-data">{totalRevenue}</span></div>
                <div className="col-6"> Vote Average: <span className="meta-data">{data.vote}</span></div>
              </div>

              <a href="#x" onClick={this.handleLike}>
                <ion-icon size="large" name="heart-outline"></ion-icon>
              </a>

              {/* <a href="#" onClick={this.handleLike}>
                <ion-icon size="large" name="heart"></ion-icon>
              </a>

              <ion-icon name="heart-outline"></ion-icon>
              <ion-icon name="heart-sharp"></ion-icon> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
  componentDidUpdate() {
    document.body.style.backgroundImage = 'url(' + backdropIMG + ')';
  }
}


function nestedDataToString(nestedData) {
  let nestedArray = [],
    resultString;
  if (nestedData !== undefined) {
    nestedData.forEach(function (item) {
      //nestedArray.push(item.name);
      nestedArray.push(item);
    });
  }
  resultString = nestedArray.join(', '); // array to string
  return resultString;
};


function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toDateString()
}

export default Card;