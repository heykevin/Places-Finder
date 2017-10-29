import React, { Component } from 'react';

// Higher order component to expose Google Maps/Places api to children
export const googleApiWrapper = (WrappedComponent) => {
  return class extends Component {
    constructor() {
      super();
      // Initialize empty state
      this.state = {
        map: undefined, 
        service: undefined,
        location: undefined,
        google: undefined
      };
    }

    componentDidMount() {
      // set google's initMap function to be our initMap with correct location
      // put in didMount so that div and script are loaded
      window.initMap = this.initMap.bind(this);
      window.initMap();
    }

    getLocation() {
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition((position) => {
          console.log("done");
          const loc = [position.coords.latitude, position.coords.longitude]
          this.setState({
            location: new window.google.maps.LatLng(loc[0], loc[1])
          });
          // redraw map with new location
          window.initMap();
        });
      }
    }

    // initMap callback that Google api calls
    initMap() {
      let map = new window.google.maps.Map(window.document.getElementById("map"), {
        center: this.state.location || new window.google.maps.LatLng(-33.8665433,151.1956316),
        zoom: 15
      });

      this.setState({
        map: map,
        service: new window.google.maps.places.PlacesService(map)
      });
    }

    // Render the component we want wrapped with access to Google's api
    render() {
      this.getLocation();

      return (
        <div className="google-wrapper">
           <WrappedComponent 
              map={this.state.map}
              google={window.google}
              loc={this.state.location}
              service={this.state.service}
              {...this.props}
            /> 
        </div>
      );
    }
  }
}

export default googleApiWrapper;
