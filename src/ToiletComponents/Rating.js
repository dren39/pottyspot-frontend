import React, {Component} from 'react'
import {connect} from 'react-redux';

class Rating extends Component {

  state = {
    rating: null,
  };

  changeStarColor = (event) => {
    //this changes the stars' style color to gold and black
    // let element = document.getElementById(event.target.id);
    let starId = parseInt(event.target.id);
    //starId is equal to the integer id of the clicked star
    let strId = "";
    let i = 1;
    while (i <= starId) {
      strId = i.toString()
      //strId is the stringify of whatever i is on each iteration
      let gold = document.getElementById(strId)
      //on each iterating grab a star element who's integer id matches i
      gold.style.color = "gold";
      i++;
    };
    while (i <= 5) {
      //i has been incremented up to the value of the clicked star
      strId = i.toString()
      let black = document.getElementById(strId)
      //grab the star element who's integer id matches i's current value
      black.style.color = "black";
      //turn the style color of each element black
      i++;
    };
  };

  createRating = () => {
    //make a POST request to the Rating controller
    fetch('http://localhost:4000/api/v1/ratings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        value: this.state.rating,
        user_id: this.props.user.id,
        toilet_id: this.props.toilet.id
      })
    })//end of fetch
    .then(response => response.json())
    .then(updatedToilet => {
      this.props.dispatch({type: "update_toilet", payload: updatedToilet})
    })//end of .then
  };

  saveRating = () => {
    //this function saves all the star elements who's color is gold to an array
    if (this.props.user) {
      const goldStars = [];
      const stars = document.getElementsByClassName("star")
      //return an array of elements who's className is "star" (always 5)
      for (let i = 0; i < stars.length; i++) {
        if (stars[i].style.color === "gold") {
          //iterate over the stars array based on it's length and for each element who's style color is 
          // "gold" push into the goldStars array
          goldStars.push(stars[i].style.color)
        }
      };
      //save the length of the goldStars array to local state, this presents the value rated by the user,
      // and call the createRating function
      this.setState({rating: goldStars.length}, ()=>this.createRating())

    }
    else {
      alert("You must be logged in to rate this toilet")
    }
  };

  render () {
    return (
      <div id="rate-div">
        Rate the cleanliness of this toilet<br/>
        <span id="1" className="star" onMouseEnter={this.changeStarColor} onClick={this.saveRating}/>
        <span id="2" className="star" onMouseEnter={this.changeStarColor} onClick={this.saveRating}/>
        <span id="3" className="star" onMouseEnter={this.changeStarColor} onClick={this.saveRating}/>
        <span id="4" className="star" onMouseEnter={this.changeStarColor} onClick={this.saveRating}/>
        <span id="5" className="star" onMouseEnter={this.changeStarColor} onClick={this.saveRating}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    toilet: state.toilet
  }
};

export default connect(mapStateToProps)(Rating);
