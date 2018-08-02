import React from 'react';
import { Button } from 'reactstrap';
import { Switch, Route } from 'react-router-dom'
import { verifyUsers, logoutUsers, getUser, getUsers } from '../actions/userActions';
import {
    getFromStorage,
    setInStorage,
} from '../utils/storage';

// Components
import AppNavbar from './AppNavbar';
import Login from './Login';
import Page from './Page';

// CSS
import './Home.css';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            first_name: '',
            last_name: '',
            email: ''
        };
        this.logout = this.logout.bind(this);
    }

    async componentDidMount() {
        var self = this;
        const obj = getFromStorage('react_login_app');
        // console.log(obj);
        if (obj && obj.token) {
            const { token } = obj;
            // console.log("Home Mount: " + token);
            const tok = await verifyUsers(token);
            if (tok.success) {
                const mainUser = await getUser(token);
                // console.log(mainUser);
                self.setState({
                    token,
                    first_name: mainUser.first_name,
                    last_name: mainUser.last_name,
                    email: mainUser.email
                });
            }
        }
    }

    async logout() {
        const res = await logoutUsers();
        // console.log(res);
        if (res.success) {
            this.setState({
                token: '',
                first_name: '',
                last_name: '',
                email: ''
            });
        }
    }

    render() {
        const {
            token,
            first_name,
            last_name,
            email
        } = this.state;

        if (!token) {
            return (
                <div className="App_CSS">
                    <Login />
                </div>
            );
        }

        return (
            <div className="Home_CSS">
                <AppNavbar />
                <h1>Login Successful</h1>
                <div className="Profile">
                    <h2>Logged in User</h2>
                    {
                        (first_name) ? (
                            <h3>Name: {first_name} {last_name}</h3>
                        ) : (null)
                    }
                    {
                        (email) ? (
                            <h3>Email: {email}</h3>
                        ) : (null)
                    }
                </div>
                <Switch>
                    {/* <Route exact path='/' component={Home} /> */}
                    <Route path='/page' component={Page} />
                </Switch>
                <Button color="primary" onClick={this.logout}>Logout</Button>
            </div>
        );
    }
}