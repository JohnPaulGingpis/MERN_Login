import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import { Container, Row, Col, Button } from 'reactstrap';

// Components
import LoginForm from './LoginForm';
import SignUpModal from './SignUpModal';

// CSS
import './Login.css';

export default class Login extends React.Component {
    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            login_email: this.state.email,
            login_password: this.state.password
        }

        // Add user via addUser action
        // this.props.addUser(newUser);

        // Close modal
        // this.toggle();
    }

    render() {
        return (
            <div className="jumbotron">
                <Container>
                    <h1>Login</h1>
                    <LoginForm />
                    <Row>
                        <Col>
                            <Provider store={store}>
                                <SignUpModal />
                            </Provider>
                        </Col>
                        <Col>
                            {/* <Button color="primary" href="/home">Login</Button> */}
                            <Button color="primary">Login</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}