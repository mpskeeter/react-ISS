import React, { Component } from 'react';

import Crew from './Components/Crew';
import Statistics from './Components/Statistics';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    latitude: 35.455062,
    longitude: -78.824019,
  };

  getLatLong() {
    if (this.state.latitude === -1 && this.state.longitude === -1) {
      // get current latitude/longitude
    }
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header> */}
        <div className="App-intro">
          <div>Current Information From Space</div>
          <div>
            <Crew />
            <Statistics />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
