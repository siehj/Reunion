import React from 'react';
import axios from 'axios';
import { Row, Col, Input, InputGroup, Button } from 'reactstrap';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hx: [],
      msg: ''
    };
    this.createNewMsg = this.createNewMsg.bind(this);
    this.updateMsg = this.updateMsg.bind(this);
  }

  componentDidMount() {
    // axios.get('/api/chatMsgs')
    //   .then((chatHist) => this.setState({ hx: chatHist }))
  }

  updateMsg(e) {
    this.setState({ msg: e.target.value });
  }

  createNewMsg() {
    let newMsg = { username: this.props.username, message: this.state.msg };
  }
  
  render() {
    if (this.props.loggedIn) {

      return this.props.open ?
      <div id="chatBox">
        <Row>
          <Col xs="10" sm="10" md="10" lg="10" >
            <h5>CHAT</h5> 
          </Col>
          <Col xs="2" sm="2" md="2" lg="2" >
            <h5 onClick={this.props.toggleChat} >X</h5> 
          </Col>
        </Row>
        <div className="chatArea"></div>
        <InputGroup>
          <Input/>
          <Button outline color="secondary">Submit</Button>
        </InputGroup>
      </div>
      :
      <a onClick={this.props.toggleChat} ><img id="Bubble" src="data:image/png;base64,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"/></a>
    } else {
      return null;
    }

  }
}

export default Chat;
