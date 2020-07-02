import React from 'react'
import toiletSign from "../toilet-logo.png"
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class Navbar extends React.Component {

  componentDidMount() {
    //on mount grab the token from local storage
    const token = localStorage.getItem("token")
    if (token) {
      //if there was a token in local storage then make a GET request to /get_user and 
      // pass the token under the key authorization in headers
      fetch('http://localhost:4000/api/v1/get_user', {
        method: 'GET',
        headers: {
          Authorization: token
        }
      })//end of fetch
      .then(response => response.json())
      .then(data => {
        this.props.dispatch({type: "set_user", payload: data.user})
      })
    }
  }

  generateSignLog = () => {
    //create a link to the signup and login page
    return(
      <div id="sign-div">
        <p onClick={() => this.props.history.push("/signup")} className="link-to" id="signup-link-id">Signup</p>
        <p onClick={() => this.props.history.push("/login")} className="link-to">Login</p>
      </div>
    )
  };

  logoutHandler = () => {
    //remove the token from local storage and set user in store back to null
    localStorage.removeItem("token")
    this.props.dispatch({type: "set_user", payload: null})
  };

  generateGreeting = () => {
    //if user is logged in then display a greeting and a logout button
    return (
      <div id="greeting-div">
        <h3 id="greeting-header">Hi, {this.props.user.username}</h3>
        <button id="logout-btn" onClick={this.logoutHandler}>Logout</button>
      </div>
    )
  }

  render () {
    return (
      <div id="navbar">
        <div id="logo-div">
          <img id="logo-image" src={toiletSign} alt=""/>
          <h1 id="logo">PottySpot</h1>
        </div>
        <div id="nav-buttons">
          <p onClick={() => this.props.history.push("/home")} className="link-to">Home</p>
          {/*if there is a user saved in store then display a greeting, else create the signup/login links*/}
          {this.props.user ? this.generateGreeting() : this.generateSignLog()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(Navbar));
