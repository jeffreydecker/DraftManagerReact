import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Popover, Tooltip, Button, Modal, OverlayTrigger, Form, FormGroup, Col, ControlLabel, FormControl, InputGroup } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

class PlayersTable extends Component {
  state = {
    rank: [],
    hit: [],
    pitch: []
  };

  async componentDidMount() {
    // fetch('http://localhost:8080/scrape/rankings')
    //   .then(response => response.json())
    //   .then(data => this.setState({ response: data }));

    // TODO - Show loading

    var response = await fetch('http://localhost:8080/scrape/rankings');
    const rankings = await response.json();

    response = await fetch('http://localhost:8080/scrape/hitter');
    const hitters = await response.json();

    response = await fetch('http://localhost:8080/scrape/pitcher');
    const pitchers = await response.json();

    if (response.status !== 200) throw Error("Error fetching stats and rankings");

    this.setState({ rank: rankings, hit: hitters.players, pitch: pitchers.players });

    // TODO - Hide loading
  }

  render() {
    // var namesList = this.state.response.map((name, i) => {
    //   return <tr key={i}><td>{name.rank}</td><td>{name.name}</td></tr>
    // })

    return (
      <div className="container panel-default table-responsive">
      <table className="table table-sm table-striped table-hover table-condensed">
        <tbody>
          {
            this.state.rank.map((player, i) => {
              return <RankingRow key={player.id} player={player} showModal={this.props.showModal}/>
            })
          }
        </tbody>
      </table>
    </div>
    )
  }
}

class RankingRow extends Component {
  click() {
    this.props.showModal(<PlayerStats playerId={this.props.player.id} />, <h1>{this.props.player.name} - {this.props.player.team}</h1>)
  }

  render() {
    return (
      <tr key={this.props.player.id} onClick={this.click.bind(this)}>
        <td>{this.props.player.rank}</td>
        <td>{this.props.player.pos}</td>
        <td>{this.props.player.team}</td>
        <td>{this.props.player.name}</td>
      </tr>
    )
  }
}

class PlayerStats extends Component {
  state = {
    hitter: {},
    pitcher: {}
  };

  async componentDidMount() {
    const response = await fetch(`http://localhost:8080/scrape/hitter/${this.props.playerId}`);
    const hitterRes = await response.json();

    const res = await fetch(`http://localhost:8080/scrape/pitcher/${this.props.playerId}`);
    const pitcherRes = await res.json();

    if (response.status !== 200) throw Error('fail');

    this.setState({ hitter: hitterRes, pitcher: pitcherRes });
  }

  render() {
    var loading = null
    var hittingStats = null
    var pitchingStats = null

    if (this.state.hitter.name) {
      hittingStats = <HitterStatsTable hitter={this.state.hitter} />
    }

    if (this.state.pitcher.name) {
      pitchingStats = <PitcherStatsTable pitcher={this.state.pitcher} />
    }

    if (!hittingStats && !pitchingStats) {
      loading = <img src={logo} className="App-logo" alt="logo" />
    }

    return (
      <div>
        { loading }
        { hittingStats }
        { pitchingStats }
        <hr/>
        <DraftForm />
      </div>
    )
  }
}

class HitterStatsTable extends Component {
  render() {
    return (
      <table className="table table-sm table-striped table-hover table-condensed table-nonfluid">
          <thead>
            <tr>
              <th>Pos</th>
              <th>AB</th>
              <th>R</th>
              <th>HR</th>
              <th>RBI</th>
              <th>SB</th>
              <th>AVG</th>
              <th>OBP</th>
              <th>H</th>
              <th>2b</th>
              <th>3b</th>
              <th>BB</th>
              <th>K</th>
              <th>SLG</th>
              <th>OPS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ this.props.hitter.positions }</td>
              <td>{ this.props.hitter.atBats }</td>
              <td>{ this.props.hitter.runs }</td>
              <td>{ this.props.hitter.homeRuns }</td>
              <td>{ this.props.hitter.rbi }</td>
              <td>{ this.props.hitter.steals }</td>
              <td>{ this.props.hitter.average }</td>
              <td>{ this.props.hitter.obp }</td>
              <td>{ this.props.hitter.hits }</td>
              <td>{ this.props.hitter.doubles }</td>
              <td>{ this.props.hitter.tripples }</td>
              <td>{ this.props.hitter.walk }</td>
              <td>{ this.props.hitter.strikeouts }</td>
              <td>{ this.props.hitter.slugging }</td>
              <td>{ this.props.hitter.ops }</td>
            </tr>
        </tbody>
      </table>
    )
  }
}

class PitcherStatsTable extends Component {
  render() {
    return (
      <table className="table table-sm table-striped table-hover table-condensed table-nonfluid">
        <tbody>
          <tr>
            <th>Pos</th>
            <th>In</th>
            <th>K</th>
            <th>W</th>
            <th>S</th>
            <th>ERA</th>
            <th>WHIP</th>
            <th>ER</th>
            <th>H</th>
            <th>BB</th>
            <th>HR</th>
            <th>G</th>
            <th>St</th>
            <th>L</th>
            <th>CG</th>
          </tr>
          <tr>
            <td>{ this.props.pitcher.positions }</td>
            <td>{ this.props.pitcher.innings }</td>
            <td>{ this.props.pitcher.strikeouts }</td>
            <td>{ this.props.pitcher.wins }</td>
            <td>{ this.props.pitcher.saves }</td>
            <td>{ this.props.pitcher.era }</td>
            <td>{ this.props.pitcher.whip }</td>
            <td>{ this.props.pitcher.earnedRuns }</td>
            <td>{ this.props.pitcher.hits }</td>
            <td>{ this.props.pitcher.walks }</td>
            <td>{ this.props.pitcher.homeRuns }</td>
            <td>{ this.props.pitcher.games }</td>
            <td>{ this.props.pitcher.starts }</td>
            <td>{ this.props.pitcher.losses }</td>
            <td>{ this.props.pitcher.completeGames }</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

class DraftForm extends Component {
  render() {
    // TODO - Loop through list of teams for selector
    return (
      <Form horizontal>

        <FormGroup controlId="draftFormTeam">
          <Col componentClass={ControlLabel} sm={2}>
            Team
          </Col>
          <Col sm={8}>
            <FormControl componentClass="select" placeholder="select">
              <option value="select"></option>
              <option value="other">...</option>
            </FormControl>
          </Col>
        </FormGroup>

        <FormGroup controlId="draftFormAmount">
          <Col componentClass={ControlLabel} sm={2}>
            Cost
          </Col>
          <Col sm={8}>
            <InputGroup>
              <InputGroup.Addon>$</InputGroup.Addon>
              <FormControl type="number" />
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button bsStyle="success" type="button">Draft</Button>
          </Col>
        </FormGroup>

      </Form>
    )
  }
}

export default PlayersTable;
