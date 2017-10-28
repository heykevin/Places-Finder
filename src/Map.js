import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import googleApiWrapper from './GoogleApiWrapper.js';
import './Map.css';

class Map extends Component {
  
  constructor(props) {
    super(props);
  }

  createMarker(place) {
    var placeLoc = place.geometry.location;
    
    // var marker = new this.props.google.maps.Marker({
    //   map: this.context.map,
    //   position: place.geometry.location
    // });
    // let infowindow = new this.props.google.maps.InfoWindow();
    // const map = this.context.map;
    // this.props.google.maps.event.addListener(marker, 'click', function() {
    //   infowindow.setContent(place.name);
    //   infowindow.open(map, this);
    // });
  }

  cb(results, status) {
    console.log("CLICK", status)
    if (status == this.props.google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        console.log(place);
        this.createMarker(results[i]);
      }
    }
  }

  searchPlace() {
    console.log("searching");
    console.log(this.context);
    let request = {
      location: new this.props.google.maps.LatLng(-33.8665433,151.1956316),
      radius: '500',
      type: ['restaurant']
    };
    let pyrmont = new this.props.google.maps.LatLng(-33.8665433,151.1956316);
    this.props.service.nearbySearch(request, this.cb.bind(this))
  }

  render() {
    return (
      <div className="bottom">
        <button className="search" onClick={() => this.searchPlace()}> Search </button>
        <div id="map">
        </div>
      </div>
    );
  }
}

export default googleApiWrapper(Map);