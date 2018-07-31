import React, { Component } from 'react';
// import { Switch, Route } from 'react-router-dom'
import axios from 'axios';
import {
  getFromStorage,
  // setInStorage,
} from './utils/storage';

// Components
// import AppNavbar from './components/AppNavbar';
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

  componentDidMount() {
    var self = this;
    const obj = getFromStorage('react_login_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      // Should be moved into its own folder
      console.log("Mount: " + token);
      axios.get('/api/users/verify?token=' + token)
        .then(function (res) {
          console.log(res);
          if (res.data.success) {
            self.setState({
              token,
              isLoading: false
            });
          }
          else {
            self.setState({
              isLoading: false
            });
          }
        })
    }
    else {
      self.setState({
        isLoading: false,
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
        // <Provider store={store}>
          <div className="App_CSS">
            <Login />
          </div>
        // </Provider>
      );
    }

    return (

      <div className="App_CSS">
        <Home />
        {/* <Login /> */}
      </div>
    );
  }
}