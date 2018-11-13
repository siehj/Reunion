import React from 'react';
import { Form, Input, FormGroup, Row, Col, Label, Button } from 'reactstrap';


const SignUp = (props) => (
  <div id="signUp" >
    <Row>
      <Col className="text-center" >
        <h3>Sign Up</h3>
      </Col>
    </Row>
    <Row form >
      <Col >
        <FormGroup>
          <Label>First Name</Label>
          <Input type="text" name="firstName" onChange={props.update}/>
        </FormGroup>
      </Col>
      <Col >
        <FormGroup>
          <Label>Last Name</Label>
          <Input type="text" name="lastName" onChange={props.update}/>
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col style={{ paddingRight: '5px' }} > 
        <FormGroup>
          <Label>Username</Label>
          <Input type="text" name="username" onChange={props.update}/>
        </FormGroup>
      </Col>
      <Col style={{ paddingLeft: '5px' }} >
        <FormGroup>
          <Label>Password</Label>
          <Input type="password" name="password" onChange={props.update}/>
        </FormGroup>
      </Col>
      
    </Row>
    { props.error[1].length && props.error[0] === 'signUp' ? props.error : null }
    <Button outline color="secondary" block name="signUp" onClick={props.submit} >Sign Up</Button>
  </div>
);

export default SignUp;
