import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
// import Leaflet from 'leaflet';
// import MyMap from './MapComponents/Map';
import {Link} from 'react-router-dom'

class Home extends Component {

  //this will grab the user's lat.lng from the browser the moment they open the application then save the coordinates to state
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.props.dispatch({type:'set_lat_lng', lat:position.coords.latitude, lng:position.coords.longitude})
    })
  };

  //this makes a POST request to my backend api and passes the user lat,lng saved in redux in order to make GET request to toilet api in the backend
  // toiletsHandler = () => {
  //   // console.log("This is the toilet handler");
  //   fetch('http://localhost:4000/api/v1/toilets', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       lat: this.props.userCoordinates.lat,
  //       lng: this.props.userCoordinates.lng
  //     })
  //   })//end of fetch
  //   .then(response => response.json())
  //   .then(toiletsData => {
  //     this.props.dispatch({type: 'save_toilets', payload:toiletsData})
  //   })
  //   return <MyMap toilets={this.props.toilets}/>
  // };

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

// const mapStateToProps = (state) => {
//   return {
//     userCoordinates: state.userCoordinates,
//     toilets: state.toilets
//   }
// };

export default connect()(Home);
// <button onclick={this.toiletsHandler}>Show me the toilets!</button>

// <p>{this.props.userCoordinates.lat}, {this.props.userCoordinates.lng}</p>
