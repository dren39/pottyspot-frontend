import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

const initialState = {
  userCoordinates: {
    lat: null,
    lng: null
  },
  zoom: 18,
  toilets: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "set_lat_lng":
      return {...state,
        userCoordinates: {lat: action.lat, lng: action.lng
        }}
    case "save_toilets":
      return {...state, toilets: action.payload}
    default:
      return state
  }

}

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,document.getElementById('root')
);
