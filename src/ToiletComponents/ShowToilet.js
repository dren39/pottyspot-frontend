import React, {Component} from 'react';
import { Button, Header, Modal, Form, Dropdown } from 'semantic-ui-react';
import {connect} from 'react-redux';
import Rating from './Rating';
import AverageRating from './AverageRating';

class ShowToilet extends Component {

  state = {
    modalOpen: true,
    togglePasswordForm: false,
    togglePurchaseForm: false,
    passwordInput: '',
    purchaseSelection: ''
  };

  handleClose = () => {
    //when the modal closes it will dispatch and toggle the boolean in the store back to false
    this.props.dispatch({type:"toggle_modal_off"})
  };

  passwordFormHandler = () => {
    //this toggles the pass form display
    // let gold = document.querySelector('.star')
    // gold.style.color = "gold"
    this.setState({togglePasswordForm: !this.state.togglePasswordForm})
  };

  passwordSubmitHandler = (event) => {
    //this function makes a PATCH request to the specific toilet and updates its password in the backend and updates the toilet array with the new updated object and the single toilet in state so that the modal and map updates with the change
    event.preventDefault();
    fetch(`http://localhost:4000/api/v1/toilets/${this.props.toilet.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: this.state.passwordInput
      })
    })//end of fetch
    .then(response => response.json())
    .then(updatedToilet => {
      this.setState({passwordInput: ''})
      this.props.dispatch({type:'update_toilet', payload: updatedToilet})
    });//end of .then
  };

  passwordChangeHandler = (event) => {
    //this sets the value of the input field
    this.setState({passwordInput: event.target.value})
  }

  generatePasswordForm = () => {
    //this method is called on to generate a form for updating the password
    return (
      <Form size='tiny'>
        <Form.Field>
          <input placeholder='Enter new password' width={4} onChange={this.passwordChangeHandler} value={this.state.passwordInput}/>
        </Form.Field>
        <div>
          <Button type='button' size='tiny' onClick={this.passwordFormHandler}>Close</Button>
          <Button type='submit' size='tiny' onClick={this.passwordSubmitHandler}>Submit</Button>
        </div>
      </Form>
    )
  };

  generatePasswordButton = () => {
    //this method is called on to generate a button for toggling the password update form
    return (
      <Modal.Actions>
        <Button type='button'size='tiny' onClick={this.passwordFormHandler}>Update</Button>
      </Modal.Actions>
    )
  };
//-------------------------------Purhase----------------------------
  purchaseDropHandler = () => {
    //this toggles the purchase dropdown
    this.setState({togglePurchaseForm: !this.state.togglePurchaseForm})
  };

  generatePurchaseButton = () => {
    //this generates a button for toggling the purchase dropdown
    return (
      <Modal.Actions>
        <Button type='button' size='tiny' onClick={this.purchaseDropHandler}>Update</Button>
      </Modal.Actions>
    )
  };

  purchaseChangeHandler = (event) => {
    //this saves the text of the dropdown selection to local state
    this.setState({purchaseSelection: event.target.textContent})
  };

  purchaseSubmitHandler = (event) => {
    //this makes a PATCH request to the backend to update the purchase boolean for a specific toilet
    event.preventDefault();
    let selection = null
    this.state.purchaseSelection === "yes" ? selection = true : selection = false
    fetch(`http://localhost:4000/api/v1/toilets/${this.props.toilet.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        purchase: selection
      })
    })//end of fetch
    .then(response => response.json())
    .then(updatedToilet => this.props.dispatch({type:'update_toilet', payload: updatedToilet}));//end of .then
  };


  generatePurchaseDrop = () => {
    //this generates the dropdown selections
    const purchaseOptions = [{key:"yes", text:"yes", value:"yes"}, {key: "no", text:"no", value:"no"}];
    return (
      <>
        <Dropdown placeholder="Enter yes or no" options={purchaseOptions} selection onChange={this.purchaseChangeHandler} />
        <div id="purchase-btn-div">
          <Button type='button' size='tiny' onClick={this.purchaseDropHandler}>Close</Button>
          <Button type='submit' size='tiny' onClick={this.purchaseSubmitHandler}>Submit</Button>
        </div>
      </>
    )
  };

  render() {
    return (
        <Modal open={this.state.modalOpen} onClose={this.handleClose} size='small' closeIcon>
          {/* when the component is called the open attribute will check local state which is always true which then tells the modal to render. when the modal is closed it will fire a dispatch to toggle the modal in global state so that when the page rerenders the ternary will return false and not render the Show component and thus the modal won't render either */}
          <Header icon='marker' content={this.props.toilet.name} />
          <Modal.Content>
            <AverageRating />
            <p>Address:</p>
            <p>{this.props.toilet.street}</p>
            <p>{this.props.toilet.city}, {this.props.toilet.state}</p>
            <p>Directions: {this.props.toilet.directions}</p>
            <p>Comments: {this.props.toilet.comments}</p>
            <p>Door password: {this.props.toilet.password}</p>
            {this.state.togglePasswordForm ? null : this.generatePasswordButton()} {/*this ternary checks local state whether to generate a button for generating the update pass word form*/}
              {this.state.togglePasswordForm ? this.generatePasswordForm(): null} {/*this checks the same local state whether to generate the update password form*/}
            <br/><p>Does this store require you to purchase?: {this.props.toilet.purchase ? "Yes": "No"}</p>
              {this.state.togglePurchaseForm ? null : this.generatePurchaseButton()}
              {this.state.togglePurchaseForm ? this.generatePurchaseDrop(): null}
            <Rating/>
          </Modal.Content>
        </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    toilet: state.toilet,
    ratings: state.ratings
  }
};

export default connect(mapStateToProps)(ShowToilet)
