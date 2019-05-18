import React from 'react'
import {connect} from 'react-redux';

class AverageRating extends React.Component {

  state = {
    average: 0,
    averageLength: 0
  };

  componentDidMount() {
    this.calculateAverageRating()
  }

  createStars = () => {
    return (
      <div>
        <div id="average-star-display">
          <span id="6" className="average-star" />
          <span id="7" className="average-star" />
          <span id="8" className="average-star" />
          <span id="9" className="average-star" />
          <span id="10" className="average-star" />
          <p>{this.props.averageLength} reviews</p>
        </div>
        <div>
          <p>{this.props.average ? this.props.average:0}/5</p>
          {console.log(this.props.average)}
        </div>
      </div>
    )
  }

  changeStarColor = (adjustedAverage) => {
    //this function changes the color of the stars
      // let element = document.getElementById(adjustedAverage);
      let strId = "";
      let i = 6;
      while (i <= adjustedAverage) {
        //while i is less than the average passed in arguement run the loop
        strId = i.toString()
        let gold = document.getElementById(strId)
        //grab the element who's integer id is equal to the value of i at each iteration
        gold.style.color = "gold";
        //change the color of the found element to gold
        i++;
      };
      while (i <= 10) {
        strId = i.toString()
        let white = document.getElementById(strId)
        //grab the element who's integer id is equal to the value of i at each iteration
        white.style.color = "black";
        //change the color of the found element to black
        i++;
      };
  };

  sum = (total,num) => {
    //this is the callback function used by the .reduce() to compare two elements in the array
    return total+num;
  };

 calculateAverageRating = () => {
    const ratings = [];
    this.props.toilet.ratings.forEach(rating => {
      //iterate over the array of rating objects in the toilet object (provided by serializer) and push the value at a key of value into the ratings array
      ratings.push(rating.value)
    })
    const average = Math.round((ratings.reduce(this.sum,0)/ratings.length)*10)/10
    //average is the average of all the ratings for the specific toilet object, rounded to the 10th place
    const roundAverage = Math.floor(average)
    //roundAverage rounds the average down to the nearest integer
    const adjustedAverage = roundAverage + 5
    //adjustedAverage is roundAverage plus 5, this is because elements can't have the same id(1-5) so the stars in this component were given (5-10)
    //call changeStarColor function and pass in the adjustedAverage to grab the corresponding star element
    // this.setState({average: average, averageLength: ratings.length}, ()=>this.changeStarColor(adjustedAverage))
    this.props.dispatch({type: "save_average", average: average, averageLength: ratings.length}, this.changeStarColor(adjustedAverage))

  };

  componentDidUpdate = (prevProp) => {
    //this checks to see if the toilet from the store being passed is still the same object as the toilet in the current store, if not then run calculateAverageRating again to dynamically change the star color.
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
    toilet: state.toilet,
    average: state.average,
    averageLength: state.averageLength
  }
};

export default connect(mapStateToProps)(AverageRating);
