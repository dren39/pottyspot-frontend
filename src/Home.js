import React, {Component} from 'react';
import './App.css';
// import {connect} from 'react-redux';
// import Leaflet from 'leaflet';

import {Link} from 'react-router-dom'

class Home extends Component {

  render() {
    return (
      <div id="toilet-button-container">
        <h4 id="slogan">Go with Confidence</h4>

        <Link to='/map'>
          <button id="toilet-button">Show me the toilets</button>
        </Link>
      </div>
    );
  }
}

export default Home;
