import React, { Component } from 'react';
import Map from './Map.js';
import './App.css';

// App entry point
class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="bottom">
          <Map />
        </div>
      </div>
    );
  }
}

export default App;