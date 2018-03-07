import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Popover, Tooltip, Button, Modal, OverlayTrigger, Form, FormGroup, Col, ControlLabel, FormControl, InputGroup, Panel } from 'react-bootstrap';

class LeagueForm extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleTeamsChange = this.handleTeamsChange.bind(this)
    this.handleRosterChange = this.handleRosterChange.bind(this)
    this.handleMinorsChange = this.handleMinorsChange.bind(this)
    this.handleBudgetChange = this.handleBudgetChange.bind(this)

    this.state = {
      name: "",
      teams: null,
      rosterSize: null,
      minorsSpots: null,
      budget: null
    }
  }

  handleNameChange(event) {
    this.setState({name: event.target.value})
  }

  handleTeamsChange(event) {
    this.setState({teams: event.target.value})
  }

  handleRosterChange(event) {
    this.setState({rosterSize: event.target.value})
  }

  handleMinorsChange(event) {
    this.setState({minorsSpots: event.target.value})
  }

  handleBudgetChange(event) {
    this.setState({budget: event.target.value})
  }

  handleSubmit(event) {
    console.log(`name: ${this.state.name} teams: ${this.state.teams} roster: ${this.state.rosterSize} minorsSpots: ${this.state.minorsSpots} budget: ${this.state.budget}`)

    var leagueTeams = [];
    for (var i = 0; i < this.state.teams; i++) {
      leagueTeams.push({
        id: Math.random().toString(36).substr(2, 9),
        name: `Team${i}`,
        players: [],
        minors: [],
        budget: this.state.budget
      })
    }

    var league = {
      id: Math.random().toString(36).substr(2, 9),
      name: this.state.name,
      teams: this.state.teams,
      roster: this.state.rosterSize,
      minorsSpots: this.state.minorsSpots,
      budget: this.state.budget,
      teams: leagueTeams
    }

    this.props.onLeagueCreate(league)

    event.preventDefault()
  }

  render() {
    return (
      <Form horizontal onSubmit={this.handleSubmit}>

        <FormGroup controlId="draftFormLeagueName">
          <Col componentClass={ControlLabel} sm={3}>
            Name
          </Col>
          <Col sm={7}>
              <FormControl type="text" placeholder="League Name" value={this.state.name} onChange={this.handleNameChange}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="draftFormTeams">
          <Col componentClass={ControlLabel} sm={3}>
            Teams
          </Col>
          <Col sm={7}>
            <InputGroup>
              <InputGroup.Addon>#</InputGroup.Addon>
              <FormControl type="number" placeholder="Number Of Teams" value={this.state.teams} onChange={this.handleTeamsChange}/>
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup controlId="draftFormRoster">
          <Col componentClass={ControlLabel} sm={3}>
            Roster Size
          </Col>
          <Col sm={7}>
            <InputGroup>
              <InputGroup.Addon>#</InputGroup.Addon>
              <FormControl type="number" placeholder="Required Roster Spots" value={this.state.rosterSize} onChange={this.handleRosterChange}/>
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup controlId="draftFormMinors">
          <Col componentClass={ControlLabel} sm={3}>
            Minors Spots
          </Col>
          <Col sm={7}>
            <InputGroup>
              <InputGroup.Addon>#</InputGroup.Addon>
              <FormControl type="number" placeholder="Minors Player Spots" value={this.state.minorsSpots} onChange={this.handleMinorsChange}/>
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup controlId="draftFormBudget">
          <Col componentClass={ControlLabel} sm={3}>
            Budget
          </Col>
          <Col sm={7}>
            <InputGroup>
              <InputGroup.Addon>$</InputGroup.Addon>
              <FormControl type="number" placeholder="Auction Budget" value={this.state.budget} onChange={this.handleBudgetChange}/>
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={3} sm={7}>
            <Button bsStyle="success" type="submit">Create</Button>
          </Col>
        </FormGroup>

      </Form>
    )
  }
}

export default LeagueForm;
