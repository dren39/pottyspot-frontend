import React from 'react'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

class Login extends React.Component {

  state = {
    username: '',
    password: ''
  };

  changeHandler = (event) => {
    //this is saving the user input to local state
    this.setState({[event.target.name]: event.target.value})
  };

  loginHandler= (event) => {
    //this is making a POST request to the auth controller in the backend
    event.preventDefault();
    fetch('http://localhost:4000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: this.state
      })
    })//end of fetch
    .then(response => response.json())
    .then(data => {
      console.log(data);
      localStorage.setItem('token', data.token)//set local storage with the token created from the backend
      this.setState({username: '', password: ''})//set the input field back to blank
      this.props.dispatch({type: "set_user", payload: data.user})//save the returned user object to the store
      this.props.history.push('/')//redirect to the homepage
    })
  };

  render () {
    return (
      <div>
        <h2 className="slogan">Login to your account</h2>
        <form onSubmit={this.loginHandler} className="form transition-animation">
          <input className="input" type="text" name ="username" placeholder="Username" value={this.state.username} onChange ={this.changeHandler}/>
          <input className="input input-password" type="password" name="password" placeholder="Password" value={this.state.password} onChange ={this.changeHandler}/>
          <button className="submit" type="submit">Login</button>
        </form>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     user: state.user
//   }
// }

export default withRouter(connect()(Login));
