import React from 'react'
import Signup from '../UserComponents/Signup'

class Navbar extends React.Component {
  render () {
    return (
      <div>
        <h1>PottySpot</h1>
        <Signup />
      </div>
    )
  }
}

export default Navbar;
