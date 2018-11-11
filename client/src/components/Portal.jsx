import React from 'react';
import Login from './NestedComponents/Login.jsx';
import SignUp from './NestedComponents/SignUp.jsx'
// import { Form, Input, FormGroup, Row, Col, Label, Button } from 'reactstrap';

class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  login() {

  }

  signUp() {

  }

  render() {
    return (
    <div id="Portal" >
      {
        this.state.loggedIn ? null :
        <div>
          <Login/>
          <SignUp/>
        </div>
      }
    </div>
    )
  }
}

export default Portal;