import React from 'react';
import Login from './NestedComponents/Login.jsx';
import SignUp from './NestedComponents/SignUp.jsx';
const axios = require('axios');
// import { Form, Input, FormGroup, Row, Col, Label, Button } from 'reactstrap';

class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      error: false,
      errMsg: '',
      username: '', 
      password: '', 
      firstName: '', 
      lastName: ''
    };
    this.login = this.login.bind(this);
    this.submit = this.submit.bind(this);
    this.signUp = this.signUp.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    //check to see if authenticated
  }

  updateData(e) {
    this.setState({ [`${e.target.name}`] : e.target.value });
  }

  login() {
    axios.post('/api/login', { username: this.state.username, password: this.state.password })
      .then(result => console.log('login result: ', result));
  }

  signUp() {
    axios.post('/api/signUp', { username: this.state.username, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName })
      .then(result => console.log('signup result: ', result))
  }

  submit(e) {
    console.log(e.target.name)
  }

  render() {
    return (
    <div id="Portal" >
      {
        this.state.loggedIn ? null :
        <div>
          <Login update={this.updateData} submit={this.submit} />
          <SignUp update={this.updateData} submit={this.submit} />
        </div>
      }
    </div>
    )
  }
}

export default Portal;