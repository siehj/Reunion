import React from 'react';
import Login from './NestedComponents/Login.jsx';
import SignUp from './NestedComponents/SignUp.jsx';
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
    this.submit = this.submit.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    //check to see if authenticated
  }

  updateData(e) {
    this.setState({ [`${e.target.name}`] : e.target.value });
  }
  
  submit(e) {
    e.target.name === 'login' ? 
    this.props.login({ username: this.state.username, password: this.state.password })
    :
    this.props.signUp({ username: this.state.username, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName })
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