import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/Routing.jsx';
import NavBar from './components/Navbar.jsx';
const axios = require('axios');


class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      currentScreen: 'Home',
      navScreens: ['Home', 'About', 'Accomodations', 'Join The Fun', 'Portal'],
      navOpen: false,
      loggedIn: false,
      error: ['', ''],
      chatOpen: false
    }
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.changeScreen = this.changeScreen.bind(this);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  componentDidMount() {
    this.currentScreen === "Home" ? () => this.openNav() : null;
  }

  openNav() {
    document.getElementById("Nav").style.width = "25%";
    this.setState({ navOpen: true });
  }
  
  closeNav() {
    document.getElementById("Nav").style.width = '0%';
    this.setState({ navOpen: false });
  }

  changeScreen(e) {
    this.setState({ currentScreen : e.target.name });
  } 

  login(user) {
    this.setState({ loggedIn: true })
    axios.post('/api/login', user)
      .then(({data}) => {
        Array.isArray(data) ? this.setState({ error: data }) : null;
      });
  }

  signUp(user) {
    // this.setState({ loggedIn: true })
    axios.post('/api/signUp', user)
      .then(({data}) => {
        Array.isArray(data) ? this.setState({ error: data }) : null;
      })
  }

  render() {
    return(
      <div id="application">
        <span onClick={this.openNav}>&#9776;</span>
        <NavBar 
          status={this.state.navOpen} 
          navScreens={this.state.navScreens} 
          closeNav={this.closeNav} 
          currentScreen={this.state.currentScreen} 
          changeScreen={this.changeScreen}
          loggedIn={this.state.loggedIn}
        />
        <Router 
          currentScreen={this.state.currentScreen}
          loggedIn={this.state.loggedIn}
          login={this.login}
          signUp={this.signUp}
          error={this.state.error}
          chatOpen={this.state.chatOpen}
        />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));