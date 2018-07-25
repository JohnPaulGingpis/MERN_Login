import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import { Container, Row, Col, Button } from 'reactstrap';

// Components
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
                    <Row>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col>
                            <Provider store={store}>
                                <SignUpModal />
                            </Provider>
                        </Col>
                        <Col>
                            {/* <Button color="primary" onClick={this.onSubmit}>Login</Button> */}
                            <Button color="primary" href="/home">Login</Button>
                        </Col>
                    </Row>
                </Container>


            </div>
            // <div class="jumbotron">
            //     <div class="container">
            //         <h1>Login</h1>
            //         <form id="form" align="center">
            //             <div class="form-group">
            //                 <input type="email" name="u" placeholder="Email" required="required" />
            //             </div>
            //             <div class="form-group">
            //                 <input type="password" name="p" placeholder="Password" required="required" />
            //             </div>
            //             <div class="form-group">
            //                 <button type="submit" class="LoginB btn btn-primary btn-block btn-large">Let me in.</button>
            //                 <label class="SignUpB" data-toggle="modal" data-target="#SignUpModal">Sign Up</label>
            //             </div>
            //         </form>
            //     </div>
            //     <div class="modal fade" id="SignUpModal" tabindex="-1" role="dialog" aria-labelledby="SignUpModalLabel" aria-hidden="true">
            //         <div class="modal-dialog" role="document">
            //             <div class="modal-content">
            //                 <div class="modal-header">
            //                     <h5 class="modal-title" id="SignUpModalLabel">Sign Up</h5>
            //                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            //                         <span aria-hidden="true">&times;</span>
            //                     </button>
            //                 </div>
            //                 <div class="modal-body">
            //                     <div class="form-group">
            //                         <label>First Name:</label>
            //                         <input type="email" name="u" placeholder="First Name" required="required" />
            //                     </div>
            //                     <div class="form-group">
            //                         <label>Last Name:</label>
            //                         <input type="email" name="u" placeholder="Last Name" required="required" />
            //                     </div>
            //                     <div class="form-group">
            //                         <label>Email:</label>
            //                         <input type="email" name="u" placeholder="Email" required="required" />
            //                     </div>
            //                     <div class="form-group">
            //                         <label>Password:</label>
            //                         <input type="password" name="p" placeholder="Password" required="required" />
            //                     </div>
            //                 </div>
            //                 <div class="modal-footer">
            //                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            //                     <button type="button" class="btn btn-primary">Sign Up</button>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div >
        );
    }
}