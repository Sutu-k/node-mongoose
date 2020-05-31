import React, { Component } from "react";
import TMDBLogo from "../images/tmdb.svg";


class SearchBox extends Component {

  constructor(props) {
    super(props);
    this.searchRef = React.createRef('search suggestion');
  }

  handleChange = (event) => {
    event.target.select();
  }

  render() {
    return (
      <div className="col-xs-12 search-container nopadding">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-lg-5">
            <a
              href="./"
              title="ReactJS TMDb Movie Search"
            >
              <img src={TMDBLogo} className="logo" alt="The Movie Database" />
            </a>
          </div>
          <div className="col-xs-12 col-sm-6 col-lg-7">
            <form className="searchbox">
              {/* <label> */}
              <input
                ref={this.searchRef}
                onClick={this.handleChange}
                className="searchbox__input typeahead form-control"
                type="text"
                placeholder="Search Movie Title..."
                id="q"
              />
              {/* </label> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default SearchBox;