import React from 'react';
import { Button } from 'reactstrap';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios';
import {
    getFromStorage,
    setInStorage,
} from '../utils/storage';

// Components
import AppNavbar from './AppNavbar';
import Login from './Login';
import Page from './Page';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: ''
        };
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        // console.log("Home!!!!!!!");
        var self = this;
        const obj = getFromStorage('react_login_app');
        if (obj && obj.token) {
            const { token } = obj;
            // Verify token
            // Should be moved into its own folder
            console.log("Home Mount: " + token);
            axios.get('/api/users/verify?token=' + token)
                .then(function (res) {
                    console.log(res);
                    if (res.data.success) {
                        self.setState({
                            token
                        });
                    }
                })
        }
    }

    logout = () => {
        const obj = getFromStorage('react_login_app');
        if (obj && obj.token) {
            const { token } = obj;
            // Verify token
            console.log("Logout: " + token);
            fetch('/api/users/logout?token=' + token)
                .then(res => res.json())
                .then(function (res) {
                    console.log(res);
                    if (res.success) {
                        setInStorage('react_login_app', { token: '' });
                        // this.setState({
                        //     token: ''
                        // });
                        // self.setState({
                        //     token: ''
                        // });
                    }
                });
        }
        const objs = getFromStorage('react_login_app');
        const { token } = objs;
        this.setState({
            token: ''
        });

        // var self = this;
        // const obj = getFromStorage('react_login_app');
        // if (obj && obj.token) {
        //     const { token } = obj;
        //     console.log(token);
        //     axios
        //         .get('/api/logout?token=' + token)
        //         .then(function (res) {
        //             console.log(res);
        //             // if (json.success) {
        //             //     this.setState({
        //             //         token: ''
        //             //     });
        //             // }
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //         });
        // }
    }

    render() {
        const {
            token
        } = this.state;

        // if (!token) {
        if (!token) {
            return (
                <div className="App_CSS">
                    <Login />
                </div>
            );
        }

        return (
            <div className="Home_CSS" >
                <AppNavbar />
                <h1>Login Successful</h1>
                <Switch>
                    {/* <Route exact path='/' component={Home} /> */}
                    <Route path='/page' component={Page} />
                </Switch>
                <Button color="primary" onClick={this.logout}>Logout</Button>
            </div>
        );
    }
}