import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Popover, Tooltip, Button, Modal, OverlayTrigger, Form, FormGroup, Col, ControlLabel, FormControl, InputGroup, Panel, Table } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

class TeamsTable extends Component {

  render() {
    return (
      <Panel className="table-responsive">
        <Panel.Heading>
          <Panel.Title componentClass="h3">Teams</Panel.Title>
        </Panel.Heading>
        <Table striped condenced hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Budget</th>
              <th>Spent</th>
              <th>Picks Remaining</th>
              <th>$ Remaining</th>
              <th>Max Bid</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.league.teams.map((team, i) => {
                return <TeamRow key={team.id} team={team} league={this.props.league} showModal={this.props.showModal}/>
              })
            }
          </tbody>
        </Table>
      </Panel>
    )
  }
}

class TeamRow extends Component {
  click() {
    this.props.showModal(<p>player table and edit table here</p>, <h1>{this.props.team.name}</h1>)
  }

  render() {
    var spent = 0;
    for (var player in this.props.team.players) {
      spent += player.salary;
    }

    var remainingBudget = this.props.team.budget - spent;
    var remainingPicks = this.props.league.rosterSize - this.props.team.players.length;
    var max = remainingBudget - remainingPicks + 1;

    return (
      <tr onClick={this.click.bind(this)}>
        <td>{this.props.team.name}</td>
        <td>{this.props.team.budget}</td>
        <td>{spent}</td>
        <td>{remainingPicks}</td>
        <td>{remainingBudget}</td>
        <td>{max}</td>
      </tr>
    )
  }
}

export default TeamsTable;
