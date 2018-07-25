import React from 'react';
import { Container, Button, Form, FormGroup, Label, Input, FormText,  } from 'reactstrap';

export default class LoginForm extends React.Component {
    render() {
        return (
            <Form>
                <FormGroup>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
                </FormGroup>
                <FormGroup>
                    <Input type="password" name="password" id="examplePassword" placeholder="Password" />
                </FormGroup>
            </Form>
        );
    }
}