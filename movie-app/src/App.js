import React, { Component } from 'react';
import Home from './pages/Home'
import Footer from './components/Footer'
import { GlobalProvider } from './context/GlobalProvider'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EntryPage from './pages/Auth/EntryPage';
import MovieList from './pages/MovieList';

class App extends Component {
  render() {
    return (
      <GlobalProvider>
        <Router>
          <Switch>
            <Route path="/authentication" component={EntryPage} />
            <Route path="/my-favorite-movies" component={MovieList} />
            <Route exact path="/" render={
              () => <div>
                <div id="outer-container">
                  {/* <!--[if lt IE 10]>
                        <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
                      <![endif]--> */}
                  <div className="container">
                    <div className="row">
                      <div className="col-xs-12 col-lg-10 offset-lg-1">
                        <Home />
                        <Footer />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            } />
          </Switch>
        </Router>

      </GlobalProvider>
    );
  }
}

export default App;