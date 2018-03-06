import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Popover, Tooltip, Button, Modal, OverlayTrigger, Form, FormGroup, Col, ControlLabel, FormControl, InputGroup } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import PlayersTable from './PlayersTable.js'

class App extends Component {

  constructor() {
    super();

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      modalTitle: null,
      modalBody: null
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(child, title) {
    this.setState({ show: true, modalChild: child, modalTitle: title });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Draft Manager</a>
          </div>
        </nav>
        <PlayersTable showModal={this.handleShow}/>
        <AppModal show={this.state.show} title={this.state.modalTitle} child={this.state.modalChild} handleClose={this.handleClose}/>
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
