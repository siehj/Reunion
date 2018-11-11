import React from 'react';
import { Form, Input, FormGroup, Row, Col, Label, Button } from 'reactstrap';


const SignUp = (props) => (
  <div>
    <Row>
      <Col className="text-center" >
        <h3>Sign Up</h3>
      </Col>
    </Row>
    <Row form >
      <Col >
        <FormGroup>
          <Label>First Name</Label>
          <Input type="text" ></Input>
        </FormGroup>
      </Col>
      <Col >
        <FormGroup>
          <Label>Last Name</Label>
          <Input type="text" ></Input>
        </FormGroup>
      </Col>
    </Row>
    <Row>
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
      
    </Row>
    <Button  outline color="secondary" block >Sign Up</Button>
  </div>
);

export default SignUp;
