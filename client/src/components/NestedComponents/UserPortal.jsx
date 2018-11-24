import React from 'react';
import { Button, Alert, Input, Row, Col } from 'reactstrap';
import VotingComponent from './ProfileComponents/Voting.jsx';
import Itenerary from './ProfileComponents/Itenerary.jsx';
import axios from 'axios';
import Modal from './Modal.jsx';


class UserPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // adminDisplay: 0
      miniScreen: '',
      modalOpen: false,
      showProfile: false,
      name: '',
      email: '',
      phone: '',
      city: '',
      state: ''
    };
    this.showUserProfile = this.showUserProfile.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.send = this.send.bind(this);
  }
  componentDidMount() {
  //   axios.get('/api/check', props.userInfo)
  //    .then(status => this.setState({ adminDisplay: status }));
  }
  
  showUserProfile() {
    this.setState({ showProfile: !this.state.showProfile });
  }

  updateUser(e) {
    this.setState({ [e.target.title] : e.target.value });
  }

  send() {
    this.setState({ showProfile : false }, () => this.props.sendUpdate(this.state.name, this.state.email, this.state.phone, this.state.city, this.state.state));  
  }

  render() {
    return (
      <div>
        <h1>Welcome Back, {this.props.userInfo.name.split(' ')[0]}!</h1>
        { 
          this.props.userInfo.email === null || this.props.userInfo.phone === null || this.props.userInfo.name === null ?
            <section>
              <Alert color="primary" >
                Some data is missing from your profile, please update as soon as possible to ensure you can be contacted with updates on the trip.
              </Alert>
            </section> 
          : null
        }{ 
          this.props.userInfo.city === null || this.props.userInfo.state === null ?
            <section>
              <Alert color="warning" >
                We are missing your location information, please update this information. 
              </Alert>
            </section> 
          : null
        }
        {
          this.state.showProfile ? 
            <section>
              <Row className="profile" >
                {/* <Col><em>Name: <Input title="name" onChange={this.updateUser} placeholder={this.props.userInfo.name}/></em></Col> */}
                <Col><em>Email: <Input title="email" onChange={this.updateUser} placeholder={this.props.userInfo.email}/></em></Col>
                <Col><em>Phone: <Input title="phone" onChange={this.updateUser} placeholder={this.props.userInfo.phone}/></em></Col>
              </Row>
              <Row>
                <Col><em>City: <Input title="city" onChange={this.updateUser} placeholder={this.props.userInfo.city}/></em></Col>
                <Col><em>State: <Input title="state" onChange={this.updateUser} placeholder={this.props.userInfo.state}/></em></Col>                
              </Row>
              <Row>
                <Col>
                  <Button style={{ marginTop: '23px' }} outline color="primary" block onClick={this.send}>Update Info</Button>
                </Col>
              </Row>
            </section>
            : null
        }
        {
          this.state.showProfile ? 
          <Button outline color="secondary" block onClick={this.showUserProfile} >Cancel</Button> :
          <Button outline color="secondary" block onClick={this.showUserProfile} >Update Info</Button>
        }
        <section>
          <div className="tabs" >
            <Row className="text-center" >
              <Col><h3>Itenerary</h3></Col>
              <Col><h3>Voting</h3></Col>
              <Col><h3>Profile</h3></Col>
            </Row>
          </div>

          <div>
            { 
              this.state.miniScreen === 'itenerary' ? <Itenerary/> : <VotingComponent />   
            }
          </div>
        </section>
      </div>
    )
  }
}


export default UserPortal;
