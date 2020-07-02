import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './App.css';

class Home extends Component {

  render() {
    return (
      <div id="toilet-button-container" className="home-animation">
        <p onClick={() => this.props.history.push("/map")} className="link-to" >Go with Confidence</p>
      </div>
    );
  }
}

export default withRouter(Home);
