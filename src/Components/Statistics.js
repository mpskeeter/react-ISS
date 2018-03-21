import React, { Component } from 'react';

import Map from './Map';
import ISSApi from '../Utils/ISSApi';

export default class Statistics extends Component {
  state = {
    count: 0,
    timestamp: 0,
    timeNatural: 0,
    position: {
      latitude: 0,
      longitude: 0,
    },
    velocityKilo: 0,
    velocityMile: 0,
    history: [],
  };

  componentDidMount() {
    ISSApi.get('/iss-now.json')
      .then((resp) => {
        console.log(resp);

        const timeNatural = this.unixNatural(resp.timestamp);

        const history = [
          {
            id: 0,
            latitude: parseFloat(resp.iss_position.latitude),
            longitude: parseFloat(resp.iss_position.longitude),
            timestamp: resp.timestamp,
            timeNatural,
            velocityKilo: null,
            velocityMile: null,
          },
        ];

        this.setState({
          count: 0,
          timestamp: resp.timestamp,
          timeNatural,
          position: resp.iss_position,
          history,
        });
      });

    this.myInterval = setInterval(this.setTimer.bind(this), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  setTimer = this.setTimer.bind(this);

  setTimer() {
    ISSApi.get('/iss-now.json')
      .then((resp) => {
        console.log(resp);
        const currCount = this.state.count;
        const newCount = Number(currCount) + 1;

        const timeNatural = this.unixNatural(resp.timestamp);

        const position = [];
        position[0] = this.state.position.latitude;
        position[1] = this.state.position.longitude;
        position[2] = resp.iss_position.latitude;
        position[3] = resp.iss_position.longitude;

        const velocityKilo = ((this.getDistance(
          position[0],
          position[1],
          position[2],
          position[3],
        ) / 5) * 3600);

        const velocityMile = velocityKilo / 1.609344;

        /* eslint-disable prefer-const */
        let history = this.state.history.slice(0);
        /* eslint-enable prefer-const */

        history.push({
          id: newCount,
          latitude: parseFloat(resp.iss_position.latitude),
          longitude: parseFloat(resp.iss_position.longitude),
          timestamp: resp.timestamp,
          timeNatural,
          velocityKilo,
          velocityMile,
          history,
        });

        // console.log(history);

        this.setState({
          count: newCount,
          timestamp: resp.timestamp,
          timeNatural,
          position: resp.iss_position,
          velocityKilo,
          velocityMile,
          history,
        });
      });
  }

  getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      (Math.sin(dLat / 2) ** 2)
      + (Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * (Math.sin(dLon / 2) ** 2));
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  deg2rad = deg => deg * (Math.PI / 180);

  unixNatural = (timestamp) => {
    const unix = Number(timestamp);
    const date = new Date(unix * 1000);
    const hours = `0${date.getHours()}`;
    const minutes = `0${date.getMinutes()}`;
    const seconds = `0${date.getSeconds()}`;
    return `${hours.substr(-2)}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
  };

  render() {
    const {
      timestamp,
      position,
      timeNatural,
      velocityKilo,
      velocityMile,
    } = this.state;
    return (
      <div align="center">
        <table>
          <tbody>
            <tr>
              <td>Latitude</td>
              <td>{position.latitude}</td>
            </tr>
            <tr>
              <td>Longitude</td>
              <td>{position.longitude}</td>
            </tr>
            <tr>
              <td>Current Timestamp (unix)</td>
              <td>{timestamp}</td>
            </tr>
            <tr>
              <td>Current Timestamp (natural)</td>
              <td>{timeNatural}</td>
            </tr>
            <tr>
              <td>Estimated Velocity (km/h)</td>
              <td>{velocityKilo.toString().substr(0, 10)}</td>
            </tr>
            <tr>
              <td>Estimated Velocity (mph)</td>
              <td>{velocityMile.toString().substr(0, 10)}</td>
            </tr>
          </tbody>
        </table>

        <div>
          <Map history={this.state.history} />
        </div>
      </div>
    );
  }
}
