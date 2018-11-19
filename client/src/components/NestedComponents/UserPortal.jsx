import React from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';

class UserPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // adminDisplay: 0
    };
  }
  // componentDidMount() {
  //   axios.get('/api/check', props.userInfo)
  //    .then(status => this.setState({ adminDisplay: status }));
  // }

  render() {
    return (
      <div>
        <h1>Welcome Back, {this.props.userInfo.name}!</h1>
      </div>
    )
  }
}


export default UserPortal;
