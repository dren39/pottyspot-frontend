import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './App.css';
// import {connect} from 'react-redux';
// import Leaflet from 'leaflet';

import {Link} from 'react-router-dom'

class Home extends Component {

  render() {
    return (
      <div id="toilet-button-container">
        <p onClick={() => this.props.history.push("/map")} className="link-to" >Go with Confidence</p>

      </div>
    );
  }
}

export default withRouter(Home);

// <Link to='/map'>
//   <button id="toilet-button">Show me the toilets</button>
// </Link>
