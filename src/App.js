import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import Main from './Components/Main';
import Stats from './Components/Stats/Stats';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>MARVEL SMASH</h1>
        <Link to='/'>Choose Team</Link><br/>
        <Link to='/stats'>Stats</Link>

        <Switch>
          <Route exact path='/' component={Main}/>
          <Route path='/stats' component={Stats}/>
        </Switch>
        
        
      </div>
    );
  }
}

export default App;
