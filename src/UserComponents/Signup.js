import React from 'react'
import { connect } from 'react-redux'

class Signup extends React.Component {

  state = {
    username: '',
    password: ''
  };

  changeHandler = (event) => {
    this.setState({[event.target.name]: event.target.value})
  };

  submitUser = (event) => {
    event.preventDefault();
    fetch('http://localhost:4000/api/v1/users', {
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
      localStorage.setItem('token', data.token)
      this.props.dispatch({type: "set_user", payload: data.user})
    })
  };

  render () {
    console.log(this.props.user);
    return (
      <form onSubmit={this.submitUser}>
        <input type="text" name ="username" placeholder="Username" value={this.state.username} onChange ={this.changeHandler}/>
        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange ={this.changeHandler}/>
        <button type="submit">Signup</button>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Signup);
