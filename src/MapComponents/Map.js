import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import {connect} from 'react-redux';
import L from 'leaflet';
import ShowToilet from '../ToiletComponents/ShowToilet';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export const pointerIcon = new L.Icon({
  //this is copied from react-leaflet to create a custom icon for the users location
  iconUrl: require('./pointerIcon.svg'),
  iconRetinaUrl: require('./pointerIcon.svg'),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 55],
  shadowUrl: './marker-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [20, 92],
})

class MyMap extends Component {

  state = {
    display: false,
    toilet: null
  };

  clickHandler = (toilet) => {
    //when the details button is clicked it will fire off this method which will fire a dispatch and change the modal toggle in global state, and also set saves the clicked toilet object to global state. when the page rerenders the ternary will return true and call the Show component.
    this.props.dispatch({type:"toggle_modal_on", payload:toilet})
  };

  renderMarkers = () => {
    //this method will iterate through the array of toilets that was retreived from state as props and create a marker for each toilet object.
    return this.props.toilets.map(toilet => {
        return (
          <Marker key={toilet.id} position={[toilet.lat,toilet.long]}>
            <Popup>
              {toilet.name}<br/>
              {Math.round(toilet.distance * 100) / 100} miles<br/>
              {toilet.street}<br/>
              {toilet.city}<br/>
              <button onClick={()=>this.clickHandler(toilet)}>
                See details
              </button>
            </Popup>
          </Marker>
        )//end of return
      })//end of iterate
  };//end of method

  renderUserMarker = () => {
    //this method will a special marker for the user's coordinates taken from state
    const myPosition= [this.props.userCoordinates.lat, this.props.userCoordinates.lng];
    return <Marker position={myPosition} icon={pointerIcon}><Popup>You are here</Popup></Marker>
  };

  render() {
    const myPosition= [this.props.userCoordinates.lat, this.props.userCoordinates.lng]; //this saves users current lat,long from redux to myPosition which is passed to center

    return (
      //this ternary prevents the map from erroring out by checking to see if the user's lat exists, if it does then render the map and markers, if not then just displaying "loading"
      this.props.userCoordinates.lat ?
      <>
        <Map style={{ width: '100%', height: '700px' }} center={myPosition} zoom={18}>
          <TileLayer
            attribution='Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a>
            &mdash; Map data
            &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          {this.renderMarkers()}
          {this.renderUserMarker()}
        </Map>
        {/*this checks global state to display the modal or not*/}
        {this.props.displayModal ? <ShowToilet /> : null}
      </>
      : "Loading toilets"
    )//end of return
  }//end of render
}//end of class

const mapStateToProps = (state) => {
  //this is grabbing data from my state
  return {
    userCoordinates: state.userCoordinates,
    zoom: state.zoom,
    toilets: state.toilets,
    displayModal: state.displayModal,
    toilet: state.toilet
  }
};

export default connect(mapStateToProps)(MyMap)
