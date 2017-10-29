import React, { Component } from 'react';
import googleApiWrapper from './GoogleApiWrapper.js';
import MapList from './MapList.js';
import './styles/Map.css';

class Map extends Component {
  
  constructor() {
    super();
    this.state = {
      google: null
    };
  }

  // Render the div with id Map for google api to target
  render() {
    return (
      <div className="map">
        <MapList {...this.props}/>
        <div id="map" />
      </div>
    );
  }
}

export default googleApiWrapper(Map);
