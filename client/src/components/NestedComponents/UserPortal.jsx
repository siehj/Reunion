import React from 'react';
import { Button, Alert, Input, Row, Col } from 'reactstrap';
import axios from 'axios';
import Modal from './Modal.jsx';


class UserPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // adminDisplay: 0
      modalOpen: false,
      showProfile: false
    };
    this.showUserProfile = this.showUserProfile.bind(this);
  }
  componentDidMount() {
  //   axios.get('/api/check', props.userInfo)
  //    .then(status => this.setState({ adminDisplay: status }));
  }
  
  showUserProfile() {
    this.setState({ showProfile: !this.state.showProfile });
  }

  render() {
    return (
      <div>
        <h1>Welcome Back, {this.props.userInfo.name}!</h1>
        { 
          this.props.userInfo.email === null || this.props.userInfo.phone === null || this.props.userInfo.name === null ?
            <section>
              <Alert color="primary" >
                Some data is missing from your profile, please update as soon as possible to ensure you can be contacted with updates on the trip.
              </Alert>
            </section> 
          : null
        }
        {
          this.state.showProfile ? 
            <section>
              <Row className="profile" >
                <Col><em>Name: <Input placeholder={this.props.userInfo.name} /></em></Col>
                <Col><em>Email: <Input placeholder={this.props.userInfo.email}/></em></Col>
                <Col><em>Phone: <Input placeholder={this.props.userInfo.phone}/></em></Col>
                <Col><Button style={{marginTop: '23px'}}  outline color="primary" block >Update Info</Button></Col>
              </Row>
            </section>
            : null
            // <section>
            //   <Row className="profile" >
            //     <Col><em>Name: {this.props.userInfo.name}</em></Col>
            //     <Col><em>Email: {this.props.userInfo.email}</em></Col>
            //     <Col><em>Phone: {this.props.userInfo.phone}</em></Col>
            //   </Row>
            // </section>
        }
        {
          this.state.showProfile ? 
          <Button outline color="secondary" block onClick={this.showUserProfile} >Cancel</Button> :
          <Button outline color="secondary" block onClick={this.showUserProfile} >Update Info</Button>
        }
        <section>

          <div>

          </div>
        </section>
      </div>
    )
  }
}


export default UserPortal;
