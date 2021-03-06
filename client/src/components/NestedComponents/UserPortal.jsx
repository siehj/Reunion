import React from 'react';
import { Button, Alert, Input, Row, Col } from 'reactstrap';
import VotingComponent from './ProfileComponents/Voting.jsx';
import Itenerary from './ProfileComponents/Itenerary.jsx';
// import fake from '../../../../database/TemporaryData.js';
import axios from 'axios';
import Modal from './Modal.jsx';


class UserPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // adminDisplay: 0
      screens: ['itenerary', 'voting'],
      itenerary: {
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
      },
      voting: [],
      miniScreen: 'itenerary',
      modalOpen: false,
      showProfile: false,
      name: '',
      email: '',
      phone: '',
      city: '',
      state: '',
    };
    this.showUserProfile = this.showUserProfile.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.send = this.send.bind(this);
    this.changeScreen = this.changeScreen.bind(this);
    this.castVote = this.castVote.bind(this);
    this.getVotingData = this.getVotingData.bind(this);
  }
  componentDidMount() {
  //   axios.get('/api/check', props.userInfo)
  //    .then(status => this.setState({ adminDisplay: status }));
    this.getVotingData()
  }

  getVotingData() {
    axios.get('/api/getAllVotingTopics')
      .then(({ data }) => this.setState({ voting : data }));
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

  changeScreen(e) {
    this.setState({ miniScreen : e.target.title });
  }

  castVote(optionId) {
    let userId = this.props.userInfo.id;
    axios.post('/api/castVote', { optionId, userId })
      .then(() => this.getVotingData());
  }

  render() {
    return (
      <div>
        <h1>Welcome Back, {this.props.userInfo.name.split(' ')[0]}!</h1>
        { 
          this.props.userInfo.email === null || this.props.userInfo.phone === null || this.props.userInfo.name === null ?
            <section>
              <Alert color="secondary" >
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
              {this.state.screens.map((screen, idx) => {
                return <Col key={idx} ><h3 title={screen} style={{ textDecoration: this.state.miniScreen === screen ? 'underline' : null, fontSize: this.state.miniScreen === screen ? '35px' : null }} onClick={this.changeScreen} >{screen.toUpperCase()}</h3></Col>
              })}
              {/* <Col><h3 title="itenerary" onClick={this.changeScreen} >Itenerary</h3></Col>
              <Col><h3 title="voting" onClick={this.changeScreen} >Voting</h3></Col> */}
              {/* <Col><h3>Profile</h3></Col> */}
            </Row>
          </div>

          <div>
            { 
              this.state.miniScreen === 'itenerary' ? <Itenerary sched={this.state.itenerary} /> : <VotingComponent vote={this.castVote} item={this.state.voting} />   
            }
          </div>
        </section>
      </div>
    )
  }
}


export default UserPortal;
