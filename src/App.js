import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Popover, Tooltip, Button, Modal, OverlayTrigger } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';


class App extends Component {

  constructor() {
    super();

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      modalPlayer: null,
      modalChild: null
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(child) {
    this.setState({ show: true, modalChild: child });
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
        <AppModal show={this.state.show} child={this.state.modalChild} handleClose={this.handleClose}/>
        <div id="playerstats"></div>
      </div>
    )
  }
}

class PlayersTable extends Component {
  state = {
    response: []
  };

  async componentDidMount() {
    // fetch('http://localhost:8080/scrape/rankings')
    //   .then(response => response.json())
    //   .then(data => this.setState({ response: data }));

    // TODO - Show loading

    const response = await fetch('http://localhost:8080/scrape/rankings');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    this.setState({ response: body });

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
            this.state.response.map((name, i) => {
              return <RankingRow key={name.id} playerId={name.id} rank={name.rank} position={name.pos} team={name.team} name={name.name} showModal={this.props.showModal}/>
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
    // TODO - Show draft modal with stats
    // alert(`You clicked me: ${this.props.playerId}`);
    this.props.showModal(<PlayerStats playerId={this.props.playerId} />)
    // ReactDOM.unmountComponentAtNode(document.getElementById('playerstats'))
    // ReactDOM.render(<PlayerStats playerId={this.props.playerId} />, document.getElementById('playerstats'));

  }
  render() {
    return (
      <tr key={this.props.playerId} onClick={this.click.bind(this)}>
        <td>{this.props.rank}</td>
        <td>{this.props.position}</td>
        <td>{this.props.team}</td>
        <td>{this.props.name}</td>
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
    // TODO - Show loading

    const response = await fetch(`http://localhost:8080/scrape/hitter/${this.props.playerId}`);
    const hitterRes = await response.json();

    const res = await fetch(`http://localhost:8080/scrape/pitcher/${this.props.playerId}`);
    const pitcherRes = await res.json();

    if (response.status !== 200) throw Error('fail');

    this.setState({ hitter: hitterRes, pitcher: pitcherRes });

    // TODO - Hide loading
  }

  render() {
    var playerName = null
    var hittingStats = null
    var pitchingStats = null

    if (this.state.hitter.name || this.state.pitcher.name) {
      playerName = <h1>{ this.state.hitter.name || this.state.pitcher.name} - { this.state.hitter.team || this.state.pitcher.team}</h1>
    } else {
      playerName = <img src={logo} className="App-logo" alt="logo" />
    }

    if (this.state.hitter.name) {
      hittingStats = <HitterStatsTable hitter={this.state.hitter} />
    }

    if (this.state.pitcher.name) {
      pitchingStats = <PitcherStatsTable pitcher={this.state.pitcher} />
    }

    //


    return (
      <div>
        { playerName }
        { hittingStats }
        { pitchingStats }
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
  draft() {
    // TODO - Make call to draft player and callback to remove drafted player from available player
  }

  render() {
    return (
      <Button onClick={this.draft.bind(this)}>Draft</Button>
    )
  }
}

class AppModal extends Component {
  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );

    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

    return (
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            Player Stats
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
