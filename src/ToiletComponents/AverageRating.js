import React from 'react'
import {connect} from 'react-redux';

class AverageRating extends React.Component {

  componentDidMount() {
    this.calculateAverageRating()
  }

  createStars = () => {
    return (
      <div>
        <span id="6" className="average-star" />
        <span id="7" className="average-star" />
        <span id="8" className="average-star" />
        <span id="9" className="average-star" />
        <span id="10" className="average-star" />
      </div>
    )
  }

  changeStarColor = (adjustedAverage) => {
      // let element = document.getElementById(adjustedAverage);
      let strId = "";
      let i = 6;
      while (i <= adjustedAverage) {
        strId = i.toString()
        let gold = document.getElementById(strId)
        gold.style.color = "gold";
        i++;
      };
      while (i <= 10) {
        strId = i.toString()
        let white = document.getElementById(strId)
        white.style.color = "black";
        i++;
      };
  };

  sum = (total,num) => {
    return total+num;
  };

 calculateAverageRating = () => {
   console.log("I'm being called from average rating");
    const ratings = [];
    this.props.toilet.ratings.forEach(rating => {
      ratings.push(rating.value)
    })
    const average = Math.round((ratings.reduce(this.sum,0)/ratings.length)*10)/10
    const roundAverage = Math.floor(average)
    const adjustedAverage = roundAverage + 5
    this.changeStarColor(adjustedAverage)
  };

  componentDidUpdate = (prevProp) => {
    if (this.props.toilet !== prevProp) {
      this.calculateAverageRating()
    }
  };

  render () {
    return (
      <div>
      {this.createStars()}
      {this.componentDidUpdate(this.props.toilet)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    toilet: state.toilet
  }
};

export default connect(mapStateToProps)(AverageRating);
