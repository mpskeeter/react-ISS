import React, { Component } from 'react';
import ISSApi from '../Utils/ISSApi';

export default class Crew extends Component {
  state = {
    quantity: 0,
    crew: [],
  };

  componentDidMount() {
    ISSApi.get('/astros.json')
      .then((resp) => {
        console.log(resp);
        // ReactotronDebug(resp, true);
        // ReactotronDebug(resp.devices, true);
        // ReactotronDebug(this.state.devices, true);
        this.setState({
          quantity: resp.number,
          crew: resp.people,
        });
        // ReactotronDebug(this.state.devices, true);
      });
  }

  displayCrew = () => (
    <div align="center">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Craft</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.crew.map(crewMember => (
              <tr key={crewMember.name}>
                <td>{crewMember.name}</td>
                <td>{crewMember.craft}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )

  render() {
    return (
      <div>
        There are currently {this.state.quantity} crew members in space:
        {this.state.quantity > 0 && this.displayCrew()}
      </div>
    );
  }
}
