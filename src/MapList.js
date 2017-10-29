import React, { Component } from 'react';
import {ListGroup, FormGroup, InputGroup, FormControl, Button} from 'react-bootstrap';
import PlaceItem from './PlaceItem.js';
import './styles/MapList.css';

class MapList extends Component {
  
  constructor() {
    super();
    this.state= {
      searchText: "",
      places: null,
      status: null
    };
  }

  // Create list of places from google
  createList() {
    // Check for no results
    if (this.state.status === this.props.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
      return (<div className="no-results"> No results found :( </div>);
    }
    if (this.state.status === this.props.google.maps.places.PlacesServiceStatus.OK){
      let listItems = this.state.places.map((place) => 
        <PlaceItem 
          key = {place.id}
          map={this.props.map}
          google={this.props.google}
          place={place}
        />
      );
      return (<div className="places-list"> 
        <ListGroup> {listItems} </ListGroup>
      </div>);
    }
  }

  // Handle change when inputting text into form
  handleChange(event) {
    this.setState({ searchText: event.target.value });
  }

  // Handle search button click
  handleSearch() {
    let request = {
      location: this.props.loc,
      radius: '600',
      keyword: this.state.searchText
    };
    this.props.service.nearbySearch(request, this.cb.bind(this));
  }

  // handle enter press, stop enter from refreshing
  handleKeyPress(event) {
    if (event.charCode===13){
      event.preventDefault();
      this.handleSearch();
    }
  }

  // Callback that google api will call when services request is sent
  cb(results, status) {
    this.setState({
      places: results,
      status: status
    });
  }

  render() {
    return (
      <div className="sidebar">
        <div className="list-header">
          <div className="text-search">
            <form>
              <FormGroup>
                <InputGroup>
                  <FormControl 
                    type="text" 
                    value={this.state.searchText}
                    onChange={(event) => this.handleChange(event)}
                    onKeyPress= {(event) => {this.handleKeyPress(event)}}
                  />
                  <InputGroup.Button>
                    <Button onClick={() => this.handleSearch()}>Search</Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </form>
          </div>
        </div>
        <div className="map-list">
          {this.state.places ? this.createList() : null} 
        </div>
      </div>
    );
  }
}

export default MapList;