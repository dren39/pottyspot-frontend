import React from 'react'
// import Signup from '../UserComponents/Signup'
// import Login from '../UserComponents/Login'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'


class Navbar extends React.Component {

  componentDidMount() {
    //on mount grab the token from local storage
    const token = localStorage.getItem("token")
    if (token) {
      //if there was a token in local storage then make a GET request to /get_user and pass the token under the key authorization in headers
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
      <>
        <a href="/signup" className="nav-links">Signup</a>
        <a href="/login" className="nav-links">Login</a>
      </>
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
      <>
        <h3>Hi, {this.props.user.username}</h3>
        <button onClick={this.logoutHandler}>Logout</button>
      </>
    )
  }

  render () {
    return (
      <div id="navbar">

        <a href="/home" className="nav-links">Home</a>

        {/*if there is a user saved in store then display a greeting, else create the signup/login links*/}
        {this.props.user ? this.generateGreeting() : this.generateSignLog()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Navbar);




// <h1 >PottySpot</h1>
// <h2>Go with Confidence</h2>
