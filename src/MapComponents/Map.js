import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import {connect} from 'react-redux';
import L from 'leaflet'

//this is copied from react-leaflet to create a custom icon for the users location
export const pointerIcon = new L.Icon({
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

  //this method will iterate through the array of toilets that was retreived frm state as props and create a marker for each toilet object
  renderMarkers = () => {
    return this.props.toilets.map(toilet => {
      console.log(toilet);
        return (
          <Marker key={toilet.id} position={[toilet.lat,toilet.long]}>
            <Popup>
              {toilet.name}<br/>
            {Math.round(toilet.distance * 100) / 100} miles<br/>
            </Popup>
          </Marker>
        )//end of return
      })//end of iterate
  };//end of method

  //this method will a special marker for the user's coordinates taken from state
  renderUserMarker = () => {
    const myPosition= [this.props.userCoordinates.lat, this.props.userCoordinates.lng];
    return <Marker position={myPosition} icon={pointerIcon}><Popup>You are here</Popup></Marker>

  };

  render() {
    const myPosition= [this.props.userCoordinates.lat, this.props.userCoordinates.lng]; //this saves users current lat,long from redux to myPosition which is passed to center

    return (
      //this ternary prevents the map from erroring out by checking to see if the user's lat exists, if it does then render the map and markers, if not then just displaying "loading"
      this.props.userCoordinates.lat ?
      <Map style={{ width: '100%', height: '700px' }} center={myPosition} zoom={18}>
        <TileLayer
          attribution='Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.renderMarkers()}
        {this.renderUserMarker()}
      </Map>
      : "Loading toilets"
    )//end of return
  }//end of render
}//end of class

//this is grabbing data from my state
const mapStateToProps = (state) => {
  return {
    userCoordinates: state.userCoordinates,
    zoom: state.zoom,
    toilets: state.toilets
  }
};

export default connect(mapStateToProps)(MyMap)


// {this.renderMarkers()}
