import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import {connect} from 'react-redux';
import L from 'leaflet'

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


render() {
  const myPosition= [this.props.userCoordinates.lat, this.props.userCoordinates.lng]
  return (
    this.props.userCoordinates.lat ?
    <Map style={{ width: '100%', height: '700px' }} center={myPosition} zoom={18}>
      <TileLayer
        attribution='Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={myPosition} icon={pointerIcon}><Popup>You are here</Popup></Marker>
    </Map>
    : "Loading toilets"
  )
}
}

const mapStateToProps = (state) => {
  return {
    userCoordinates: state.userCoordinates,
    zoom: state.zoom
  }
};

export default connect(mapStateToProps)(MyMap)
