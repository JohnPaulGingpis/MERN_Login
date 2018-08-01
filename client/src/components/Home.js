import React from 'react';
import { Button } from 'reactstrap';
import { Switch, Route } from 'react-router-dom'
import { verifyUsers, logoutUsers } from '../actions/userActions';
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

    async componentDidMount() {
        var self = this;
        const obj = getFromStorage('react_login_app');
        if (obj && obj.token) {
            const { token } = obj;
            // console.log("Home Mount: " + token);
            const tok = await verifyUsers(token);
            if (tok.success) {
                self.setState({
                    token
                });
            }
        }
    }

    async logout() {
        const res = await logoutUsers();
        // console.log(res);
        if (res.success) {
            this.setState({
                token: ''
            });
        }
    }

    render() {
        const {
            token
        } = this.state;

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