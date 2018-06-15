import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import Main from './Components/Main';
import Stats from './Components/Stats/Stats';
import Smash from './Components/Smash/Smash';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>MARVEL SMASH</h1>
        <p>Data provided by Marvel. © 2018 MARVEL</p>
        <Link to='/'>Choose Team</Link><br/>
        <Link to='/stats'>Stats</Link><br/>
        <Link to='/smash'>SMASH</Link>

        <Switch>
          <Route exact path='/' component={Main}/>
          <Route path='/stats' component={Stats}/>
          <Route path='/smash' component={Smash}/>
        </Switch>
        
        
      </div>
    );
  }
}

export default App;
