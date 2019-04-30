import React from 'react'
import { connect } from 'react-redux'

class Signup extends React.Component {

  state = {
    username: '',
    password: ''
  };

  changeHandler = (event) => {
    this.setState({[event.target.name]: event.target.value}, ()=>console.log(this.state.password))
  };

  render () {
    return (
      <form action="">
        <input type="text" name ="username" placeholder="Username" value={this.state.username} onChange ={this.changeHandler}/>
        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange ={this.changeHandler}/>
        <button type="submit">Signup</button>
      </form>
    )
  }
}

export default connect()(Signup);
