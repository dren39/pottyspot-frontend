## Introduction:

PottySpot is a web application designed to help users on the go to be able to find restrooms nearby.

## Functionality

Users will need to grant the application permission to use their location when first visiting using site. This allows PottySpot to use the user's latitude and longitude coordinates in order to mark their location on the map and be able to request for restroom data from the Refuge Restroom API. Nearby restrooms are marked on a dynamically generated map and clicking on the markers will show users the name of the business or establishment that the restroom is located in, as well as the distance from their current location. Users are able to click a "see details" button on each marker to generate a modal with additional information about that restroom, such as a star rating for how clean it is, if that business requires visitors to make a purchase to use the restroom, and what the password is for the electronic lock (if there is one). Users that are signed in can contribute to the star rating, password, and purchase requirement for those restrooms.

## Installation:

This application requires having Node and React installed. For best use experience please with Chrome browser.\
Clone this repository to your local machine and navigate to the app file in your terminal.\
Run `npm install` to install the required dependencies.\
Run `npm start` to start up the React application.

Your default browser should automatically open up to the React application once the application has started up,\
but you can also manually navigate to it in your browser by going to https://locahost:3000/ \
A working demo of the app can be used [here](https://quiet-beyond-26673.herokuapp.com/).

PottySpot is powered by [REFUGE Restroom API](https://www.refugerestrooms.org/api/docs/).
