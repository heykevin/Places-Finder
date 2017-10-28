import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import PlaceItem from './PlaceItem.js';
import './MapList.css';

class MapList extends Component {
  
  constructor() {
    super();
  }

createList(places) {
  let listItems = places.map((place) => <PlaceItem map={this.props.map} google={this.props.google} place={place}/>)
  return (<div className="places-list"> 
    <ListGroup> {listItems} </ListGroup>
  </div>)
}

  render() {
    return (
      <div className="map-list">
        <div className="search-bar"> 

        </div>
        {this.props.places ? this.createList(this.props.places) : null}
      </div>
    );
  }
}

export default MapList;