import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
// import Leaflet from 'leaflet';
import MyMap from './MapComponents/Map';

class App extends Component {

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.props.dispatch({type:'set_lat_lng', lat:position.coords.latitude, lng:position.coords.longitude})

    })
  };

  render() {
    return (
      <div className="App">
        <h1>Welcome to PottySpot</h1>
        <h3>Go with Confidence</h3>
        <p>{this.props.userCoordinates.lat}, {this.props.userCoordinates.lng}</p>
         <MyMap/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userCoordinates: state.userCoordinates
  }
};

export default connect(mapStateToProps)(App);
