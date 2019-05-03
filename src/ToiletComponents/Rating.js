import React, {Component} from 'react'
import {connect} from 'react-redux';


class Rating extends Component {

  state = {
    rating: null,
    ratingTracker: []
  };

  changeStarColor = (event) => {
    let element = document.getElementById(event.target.id);
    let starId = parseInt(element.id);
    let strId = "";
    let i = 1;
    while (i <= starId) {
      strId = i.toString()
      let gold = document.getElementById(strId)
      gold.style.color = "gold";
      i++;
    };
    while (i <= 5) {
      strId = i.toString()
      let white = document.getElementById(strId)
      white.style.color = "black";
      i++;
    };
  };

  createRating = () => {
    const ratingTracker = []
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
    .then(data => {
      data.map(ratingObject => {
        ratingTracker.push(ratingObject.value)
      })
    })//end of .then
    this.props.dispatch({type: "save_ratings", payload: ratingTracker})
  };

  saveRating = (event) => {
    console.log("I've been clicked!");
    const goldStars = [];
    const stars = document.getElementsByClassName("star")
    for (let i = 0; i < stars.length; i++) {
      if (stars[i].style.color === "gold") {
        goldStars.push(stars[i].style.color)
      }
    };
    console.log(goldStars);
    this.setState({rating: goldStars.length}, ()=>this.createRating())
  };

  render () {
    return (
      <div>
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
