import React from 'react'
import Map from './Map';
import {connect} from 'react-redux';


class MyMapContainer extends React.Component {

  state = {
    haveToiletLocations: false
  }

  getToiletLocations = () => {
    //this method will make a POST request to the backend which will then make a
    // GET request to the external API, seed the database, and send the db objects back
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
      this.setState({haveToiletLocations: true})
    })//end of .then
  };//end of cdm

  render () {
    return (
      <div id="map-container">
        <Map/>
        {this.props.userCoordinates.lat && this.state.haveToiletLocations === false
          ? this.getToiletLocations()
          : null
        } {/*this ternary will prevent an infinite loop by allowing the function to run 
            once then set the state to true forever and prevents the function from ever running again*/}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  //this is grabbing data from my state
  return {
    userCoordinates: state.userCoordinates,
    toilets: state.toilets
  }
};

export default connect(mapStateToProps)(MyMapContainer);
