import React from 'react';
import { Form, Input, FormGroup, Row, Col, Label, Button } from 'reactstrap';


const Login = (props) => (
  <div id="login">
    <Row>
      <Col className="text-center" >
        <h3>Login</h3>
      </Col>
    </Row>
    <Row form >
      <Col > 
        <FormGroup>
          <Label>Username</Label>
          <Input type="text" name="username" title="login" onChange={props.update} />
        </FormGroup>
      </Col>
      <Col >
        <FormGroup>
          <Label>Password</Label>
          <Input type="password" name="password" title="login" onChange={props.update}  />
        </FormGroup>
      </Col>
      <Col>
        <Button outline color="secondary" block style={{ marginTop: '32px' }} name="login" onClick={props.submit} >Login</Button>
      </Col>
    </Row>
    { props.error[1].length && props.error[0] === 'login' ? props.error : null }
  </div>
);

export default Login;
