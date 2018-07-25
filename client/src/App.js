import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

// Components
import Home from './components/Home';
import Login from './components/Login';

// CSS
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App_CSS">
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/home' component={Home} />
        </Switch>
      </div>
    );
  }
}