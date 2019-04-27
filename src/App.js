import React, {Component} from 'react';
import './App.css';
// import {connect} from 'react-redux';
// import Leaflet from 'leaflet';
// import MyMap from './MapComponents/Map';
import {Route, Switch} from 'react-router-dom';
import Home from './Home';
import MyMapContainer from './MapComponents/MyMapContainer'

class App extends Component {

  // componentDidMount() {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     this.props.dispatch({type:'set_lat_lng', lat:position.coords.latitude, lng:position.coords.longitude})
  //
  //   })
  // };

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
  //     console.log("are you hitting this?");
  //     this.props.dispatch({type: 'save_toilets', payload:toiletsData})
  //   })
  //   return <MyMap toilets={this.props.toilets}/>
  // };

  render() {
    return (
      <>
        <Switch>
          <Route path='/map' component={MyMapContainer}/>
          <Route path='/' component={Home}/>
        </Switch>
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

export default App;
