import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component'
import './PlaceItem.css';

class PlaceItem extends Component {

  // Get image from google api of restaurant
  getThumbnail(){
    let imgStyle = {
      backgroundImage: `url(${this.props.place.icon})`
    }
    let photos = this.props.place.photos;
    if (photos){
      let image = photos[0].getUrl({'maxWidth': 1000, 'maxHeight': 1000});
      imgStyle.backgroundImage = `url(${image})`;
    }
    return imgStyle
  }

  // Place markers on map
  placeMarker() {
    let marker = new this.props.google.maps.Marker({
      map: this.props.map,
      position: this.props.place.geometry.location
    });
    this.setState({
      marker: marker
    });
  }

  // Remove markers on the map
  removeMarker() {
    this.state.marker.setMap(null);
    this.setState({
      marker: null
    });
  }

  render() {
    return (
      <div className="place-item"
        onMouseOver={() => this.placeMarker()}
        onMouseOut={() => this.removeMarker()}
      >
        <div className="place-thumb" style={this.getThumbnail()} />
        <div className="place-summary">
          <span className="place-title"> {this.props.place.name.trim()} </span>
          <div className="place-rating">
            <span className="place-rating-value"> {this.props.place.rating} </span>
            <StarRatingComponent 
              name="place-rating-stars" 
              value={this.props.place.rating} 
              editing={false}
              />
          </div>
          <span className="place-address">{this.props.place.vicinity}</span>
        </div>
      </div>
    );
  }
}

export default PlaceItem;
