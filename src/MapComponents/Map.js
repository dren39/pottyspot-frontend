import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import {connect} from 'react-redux';
import L from 'leaflet';
import ShowToilet from '../ToiletComponents/ShowToilet';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

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

  state = {
    display: false,
    toilet: null
  };


  //this method will iterate through the array of toilets that was retreived frm state as props and create a marker for each toilet object
  renderMarkers = () => {
    return this.props.toilets.map(toilet => {
      // console.log(toilet);
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

  //this method will a special marker for the user's coordinates taken from state
  renderUserMarker = () => {
    const myPosition= [this.props.userCoordinates.lat, this.props.userCoordinates.lng];
    return <Marker position={myPosition} icon={pointerIcon}><Popup>You are here</Popup></Marker>

  };

  //when the details button is clicked it will fire off this method which will fire a dispatch and change the modal toggle in global state, and also set saves the clicked toilet object to global state. when the page rerenders the ternary will return true and call the Show component.
  clickHandler = (toilet) => {
    // console.log("this toilet has been click",toilet);
    this.props.dispatch({type:"toggle_modal_on", payload:toilet})
    // console.log(this.props.displayModal);
    // console.log(this.props.toilet)
    // this.setState({display: !this.state.display, toilet: toilet}, ()=>console.log("what is display?", this.state.display))
  };

  // renderModal = () => {
  //   return (
  //     <Modal basic size='small'>
  //       <Header icon='marker' content={this.state.toilet.name} />
  //       <Modal.Content>
  //         <p>Address:</p>
  //         <p>{this.state.toilet.street}</p>
  //         <p>{this.state.toilet.city}, {this.state.toilet.state}</p>
  //         <br/><p>Directions: {this.state.toilet.directions}</p>
  //         <br/><p>Comments: {this.state.toilet.comments}</p>
  //         <br/><p>Door password: {this.state.toilet.password}</p>
  //         <br/><p>Does this store require you to purchase?: {this.state.toilet.password ? "Yes": "No"}</p>
  //       </Modal.Content>
  //     </Modal>
  //   )
  // };

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
        {/*this checks glocal state to display the modal or not*/}
        {this.props.displayModal ? <ShowToilet /> : null}
      </>
      : "Loading toilets"
    )//end of return
  }//end of render
}//end of class

//this is grabbing data from my state
const mapStateToProps = (state) => {
  return {
    userCoordinates: state.userCoordinates,
    zoom: state.zoom,
    toilets: state.toilets,
    displayModal: state.displayModal,
    toilet: state.toilet
  }
};

export default connect(mapStateToProps)(MyMap)


// {this.renderMarkers()}
