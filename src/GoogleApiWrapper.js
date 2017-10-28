import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Higher order component to expose Google Maps/Places api to children
export const googleApiWrapper = (WrappedComponent) => {
  const key = "asfsf";

  return class extends Component {
    constructor() {
      super();

      // Initialize empty state
      this.state = {
        map: undefined, 
        service: undefined,
        location: undefined
      };
    }

    // initMap callback that Google api calls
    initMap() {
      let pyrmont = new window.google.maps.LatLng(-33.8665433,151.1956316);
      let map = new window.google.maps.Map(window.document.getElementById("map"), {
        center: pyrmont,
        zoom: 15
      });
      this.setState({
        map: map,
        location: pyrmont,
        service: new window.google.maps.places.PlacesService(map)
      })
    }

    componentDidMount() {
      // set google's initMap function to be our initMap with correct location
      // put in didMount so that div and script are loaded
      let google = window.google;
      var pyrmont = new window.google.maps.LatLng(-33.8665433,151.1956316);
      window.initMap = this.initMap.bind(this);
      window.initMap();
    }

    // Render the component we want wrapped with access to Google's api
    render() {
      console.log(this.state);
      return (
        <div className="google-wrapper">
           <WrappedComponent map={this.state.map} google={window.google} loc={this.state.location} service={this.state.service} {...this.props}/> 
        </div>
      );
    }
  }
}

export default googleApiWrapper;
