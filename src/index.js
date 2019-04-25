import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

function reducer(state, = initialState, action) {
  switch (action.type) {
    case "something_here":
      return null
    default:
      return state
  }
}

const store = createStore(reducer)

ReactDOM.render(
  <Provider>
    <App />, 
  </Provider>
  document.getElementById('root')
);
