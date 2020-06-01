import React, { Component } from "react";
import TMDBLogo from "../images/logo.png";
import { GlobalContext } from '../context/GlobalProvider'
import { withRouter } from 'react-router-dom';

class SearchBox extends Component {
  static contextType = GlobalContext

  constructor(props) {
    super(props);
    this.searchRef = React.createRef('search suggestion');
  }

  handleChange = (event) => {
    event.target.select();
  }

  logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    window.location.reload()
  }

  goToList = () => {
    this.props.history.push('my-favorite-movies')
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

            {this.context.selectors.isLogged() && <>
              <ion-icon name="power-outline" title="Logout" onClick={this.logout}></ion-icon>
              <span className="mx-1"></span>
              <ion-icon name="list" title="Movie list" onClick={this.goToList}></ion-icon>
            </>}
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

export default withRouter(SearchBox)