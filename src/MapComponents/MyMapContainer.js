import React from 'react'
// import PropTypes from 'prop-types';
import MyMap from './Map';
import {connect} from 'react-redux';


class MyMapContainer extends React.Component {
  //this will make a POST request to my toilets#create backend using the user's lat,long, saved in states, to make a GET request to the external toilet api, seed my db with the response and then return an array of those db object
  componentDidMount() {
    fetch('http://localhost:4000/api/v1/toilets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lat: this.props.userCoordinates.lat,
        lng: this.props.userCoordinates.lng
      })
    })//end of fetch
    .then(response => response.json())
    .then(toiletsData => {
      this.props.dispatch({type: 'save_toilets', payload:toiletsData})
    })//end of .then
  };//end of cdm

  render () {
    return (
      <MyMap/>
    )
  }
}

//this is grabbing data from my state
const mapStateToProps = (state) => {
  return {
    userCoordinates: state.userCoordinates,
    toilets: state.toilets
  }
};

export default connect(mapStateToProps)(MyMapContainer);
