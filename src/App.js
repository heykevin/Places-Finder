import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import googleApiWrapper from './GoogleApiWrapper.js';
import Map from './Map.js';
import './App.css';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      map: undefined
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Place Finder</h1>
          <button className="search" onClick={() => console.log("click")}> Search </button>
        </header>
        <div className="bottom">
          <Map />
        </div>
      </div>
    );
  }
}

export default App;