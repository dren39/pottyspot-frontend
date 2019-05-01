import React from 'react'
import Signup from '../UserComponents/Signup'
import {connect} from 'react-redux';

class Navbar extends React.Component {
  render () {
    return (
      <div>
        <h1>PottySpot</h1>
        <h3>{this.props.user ? `Hi, ${this.props.user.username}` : null}</h3>
        <Signup />
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
