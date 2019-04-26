import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const initialState = {
  userCoordinates: {
    lat: null,
    lng: null
  },
  zoom: 18
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "set_lat_lng":
      return {...state,
        userCoordinates: {lat: action.lat, lng: action.lng
        }}
    default:
      return state
  }

}

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,document.getElementById('root')
);
