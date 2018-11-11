import React from 'react';
import { Form, Input, FormGroup, Row, Col, Label, Button } from 'reactstrap';


const Login = (props) => (
  <div>
    <Row>
      <Col className="text-center" >
        <h3>Login</h3>
      </Col>
    </Row>
    <Row form >
      <Col > 
        <FormGroup>
          <Label>Username</Label>
          <Input type="text" ></Input>
        </FormGroup>
      </Col>
      <Col >
        <FormGroup>
          <Label>Password</Label>
          <Input type="password" ></Input>
        </FormGroup>
      </Col>
      <Col>
        <Button outline color="secondary" block style={{ marginTop: '32px' }} >Login</Button>
      </Col>
    </Row>
  </div>
);

export default Login;
