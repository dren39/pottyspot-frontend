import React, {Component} from 'react';
import './App.css';
// import {connect} from 'react-redux';
// import Leaflet from 'leaflet';
import {Link} from 'react-router-dom'

class Home extends Component {

  render() {
    return (
      <>
        <h1>Welcome to PottySpot</h1>
        <h3>Go with Confidence</h3>
        <Link to='/map'>
          <button>Show me the toilets</button>
        </Link>
      </>
    );
  }
}

export default Home;
// <button onclick={this.toiletsHandler}>Show me the toilets!</button>

// <p>{this.props.userCoordinates.lat}, {this.props.userCoordinates.lng}</p>
