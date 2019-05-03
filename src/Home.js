import React, {Component} from 'react';
import './App.css';
// import {connect} from 'react-redux';
// import Leaflet from 'leaflet';

import {Link} from 'react-router-dom'

class Home extends Component {

  render() {
    return (
      <>
        <Link to='/map'>
          <button>Show me the toilets</button>
        </Link>
      </>
    );
  }
}

export default Home;
