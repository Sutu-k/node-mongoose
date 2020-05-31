import React, { Component } from 'react';
import Home from './pages/Home'
import Footer from './components/Footer'

class App extends Component {
  render() {
    return (
      <div>
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
    );
  }
}

export default App;