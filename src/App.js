import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
// import Leaflet from 'leaflet';
import {Route, Switch} from 'react-router-dom';
import Home from './Home';
import MyMapContainer from './MapComponents/MyMapContainer';
import Signup from './UserComponents/Signup';
import Login from './UserComponents/Login';

class App extends Component {

  componentDidMount() {
    //this grabs the user's current lat, lng from the browser the moment the application 
    // is started and sends it to the store
    navigator.geolocation.getCurrentPosition((position) => {
      this.props.dispatch({type:'set_lat_lng', lat:position.coords.latitude, lng:position.coords.longitude})
    })
  };

  render() {
    return (
      <>
        <Switch>
          <Route path='/signup' component={Signup}/>
          <Route path='/login' component={Login}/>
          <Route path='/map' component={MyMapContainer}/>
          <Route path='/' component={Home}/>
        </Switch>
      </>
    );
  }
}

export default connect()(App);
