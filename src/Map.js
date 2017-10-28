import React, { Component } from 'react';
import googleApiWrapper from './GoogleApiWrapper.js';
import MapList from './MapList.js';
import './Map.css';

class Map extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      google: null
    };
  }

  // Callback that google api will call when services request is sent
  cb(results, status) {
    this.setState({
      places: results
    });
  }

  searchPlace() {
    let request = {
      location: this.props.loc,
      radius: '1000',
      keyword: 'pizza'
    };
    this.props.service.nearbySearch(request, this.cb.bind(this))
  }

  render() {
    let places;
    if (this.state) {
      places = this.state.places;
    }

    return (
      <div className="bottom">
        <button className="search" onClick={() => this.searchPlace()}> Search </button>
        <MapList places={places} {...this.props}/>
        <div id="map" />
      </div>
    );
  }
}

export default googleApiWrapper(Map);
