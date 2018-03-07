import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Popover, Tooltip, Button, Modal, OverlayTrigger, Form, FormGroup, Col, ControlLabel, FormControl, InputGroup } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import PlayersTable from './PlayersTable.js'
import LeagueForm from './LeagueForm.js'

class App extends Component {

  constructor() {
    super();

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onLeagueCreate = this.onLeagueCreate.bind(this);

    this.state = {
      showModal: false,
      modalTitle: null,
      modalBody: null,
      league: null,
    }
  }

  handleClose() {
    this.setState({ showModal: false });
  }

  handleShow(child, title) {
    this.setState({ showModal: true, modalChild: child, modalTitle: title });
  }

  onLeagueCreate(newLeague) {
    this.setState({ league: newLeague})
  }

  addTeam(teamName, draftBudget, rosterSize) {
    this.state.teams.push({
      name: teamName,
      budget: draftBudget,
      players: [],
      minors: []
    })
  }

  render() {

    var main = null
    if (this.state.league != null) {
      main = <PlayersTable showModal={this.handleShow} league={this.state.league}/>
    } else {
      main = <LeagueForm onLeagueCreate={this.onLeagueCreate}/>
    }

    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Draft Manager</a>
          </div>
        </nav>
        { main }
        <AppModal show={this.state.showModal} title={this.state.modalTitle} child={this.state.modalChild} handleClose={this.handleClose}/>
        <div id="playerstats"></div>
      </div>
    )
  }
}

class AppModal extends Component {
  render() {
    // const popover = (
    //   <Popover id="modal-popover" title="popover">
    //     very popover. such engagement
    //   </Popover>
    // );
    //
    // const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

    return (
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            {this.props.title}
          </Modal.Header>
          <Modal.Body>
            {this.props.child}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
  }
}

export default App;
