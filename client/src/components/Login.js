import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import { Container, Row, Col, Button } from 'reactstrap';
import { Form, FormGroup, Input } from 'reactstrap';
import axios from 'axios';
import {
    getFromStorage,
    setInStorage,
} from '../utils/storage';

import { connect } from 'react-redux';
import { signinUser } from '../actions/userActions';

// Components
import SignUpModal from './SignUpModal';
import Home from './Home';

// CSS
import './Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            token: ''
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        // console.log("Login!!!!!!!");
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const loginUser = {
            email: this.state.login_email,
            password: this.state.login_password
        }

        // console.log("send");
        // const obj = signinUser(loginUser);
        var self = this;
        // const obj = getFromStorage('react_login_app');
        // const { token } = obj;
        axios
            .post('/api/users/signin', loginUser)
            .then(function (res) {
                // console.log(res);
                if (res.data.success) {
                    setInStorage('react_login_app', { token: res.data.token });
                    self.setState({
                        token: res.data.token
                    });
                };
                // console.log(token);
            });

        // console.log("end");

        // Add user via signinUser action
        // this.props.signinUser(loginUser);

        // Close modal
        this.toggle();
    }

    render() {
        const {
            token
        } = this.state;
        // console.log("Main: " + token);
        if (!token) {
            return (
                <div className="jumbotron">
                    <Container>
                        <h1>Login</h1>
                        {/* <LoginForm /> */}
                        <Form>
                            <FormGroup>
                                <Input
                                    type="email"
                                    name="login_email"
                                    id="login_email"
                                    placeholder="Email"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="password"
                                    name="login_password"
                                    id="login_password"
                                    placeholder="Password"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                        </Form>
                        <Row>
                            <Col>
                                <Provider store={store}>
                                    <SignUpModal />
                                </Provider>
                            </Col>
                            <Col>
                                <Button color="primary" onClick={this.onSubmit}>Login</Button>
                            </Col>
                        </Row>
                    </Container>
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

// const mapStateToProps = state => ({
//     user: state.user
// });

// export default connect(mapStateToProps, { signinUser })(Login);

export default Login;