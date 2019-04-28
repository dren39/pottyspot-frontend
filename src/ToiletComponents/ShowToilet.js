import React, {Component} from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import {connect} from 'react-redux';


// class ShowToilet extends React.Component {
//   render () {
//     console.log("Do I have toilet?", this.props.toilet);
//     return (
//       <>
//         <h1>{this.props.toilet.name}</h1>
//       </>
//     )
//   }
// }
//
// export default ShowToilet;

class ShowToilet extends Component {

  state = {
    modalOpen: true
  };

  handleClose = () => {
    // console.log("is this hitting?");
    this.props.dispatch({type:"toggle_modal_off"})
  };

  render() {
    // console.log("Do I have toilet in show?", this.props.toilet);

    return (
        <Modal open={this.state.modalOpen} onClose={this.handleClose} basic size='small'>
          {/* when the component is called the open attribute will check local state which is always true which then tells the modal to render. when the modal is closed it will fire a dispatch to toggle the modal in global state so that when the page rerenders the ternary will return false and not render the Show component and thus the modal won't render either */}
          <Header icon='marker' content={this.props.toilet.name} />
          <Modal.Content>
            <p>Address:</p>
            <p>{this.props.toilet.street}</p>
            <p>{this.props.toilet.city}, {this.props.toilet.state}</p>
            <br/><p>Directions: {this.props.toilet.directions}</p>
            <br/><p>Comments: {this.props.toilet.comments}</p>
            <br/><p>Door password: {this.props.toilet.password}</p>
            <br/><p>Does this store require you to purchase?: {this.props.toilet.password ? "Yes": "No"}</p>
          </Modal.Content>
        </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    toilet: state.toilet
  }
};

export default connect(mapStateToProps)(ShowToilet)


// <Modal.Actions>
//   <Button basic color='red' inverted>
//     <Icon name='remove' /> Close
//   </Button>
// </Modal.Actions>
