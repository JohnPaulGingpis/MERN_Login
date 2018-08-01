import React, { Component } from 'react';
import { verifyUsers } from './actions/userActions';
import {
  getFromStorage
} from './utils/storage';

// Components
import Home from './components/Home';
import Login from './components/Login';

// CSS
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: ''
    };

  }

  async componentDidMount() {
    var self = this;
    const obj = getFromStorage('react_login_app');
    if (obj && obj.token) {
      const { token } = obj;
      // console.log("Mount: " + token);
      const tok = await verifyUsers(token);
      if (tok.success) {
        self.setState({
          token,
          isLoading: false
        });
      }
      else {
        self.setState({
          token: '',
          isLoading: false
        });
      }
    }
    else {
      self.setState({
        isLoading: false
      });
    }
  }

  render() {
    const {
      isLoading,
      token
    } = this.state;
    if (isLoading) {
      return (
        <div className="App_CSS">
          <p>Loading...</p>
        </div>
      );
    }
    if (!token) {
      return (
        <div className="App_CSS">
          <Login />
        </div>
      );
    }

    return (

      <div className="App_CSS">
        <Home />
      </div>
    );
  }
}