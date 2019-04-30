import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Navbar from './NavbarComponents/Navbar';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

const initialState = {
  userCoordinates: {
    lat: null,
    lng: null
  },
  zoom: 18,
  toilets: [],
  displayModal: false,
  toilet: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "set_lat_lng":
      return {...state,
        userCoordinates: {
          lat: action.lat,
          lng: action.lng
        }
      }
    case "save_toilets":
      return {...state, toilets: action.payload}
    case "toggle_modal_on":
      return {...state, displayModal: !state.displayModal, toilet: action.payload}
    case "toggle_modal_off":
      return {...state, displayModal: !state.displayModal}
    case "update_toilet":
      const filteredToilets = state.toilets.filter(toilet => toilet.id !== action.payload.id)
      filteredToilets.push(action.payload)
      return {...state, toilet: action.payload, toilets: filteredToilets}
    // case "update_toilet_purchase":
    //   const superFilteredToilets = state.toilets.filter(toilet => toilet.id !== action.payload.id)
    //   superFilteredToilets.push(action.payload)
    //   return {...state, toilet: action.payload, toilets: superFilteredToilets}
    default:
      return state
  }
}

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Navbar/>
      <App />
    </BrowserRouter>
  </Provider>
  ,document.getElementById('root')
);
