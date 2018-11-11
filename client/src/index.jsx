import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/Routing.jsx';
import NavBar from './components/Navbar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      currentScreen: 'Home',
      navScreens: ['Home', 'About', 'Accomodations', 'Join The Fun', 'Portal'],
      navOpen: false
    }
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.changeScreen = this.changeScreen.bind(this);
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

  render() {
    return(
      <div id="application">
        <span onClick={this.openNav}>&#9776;</span>
        <NavBar status={this.state.navOpen} navScreens={this.state.navScreens} closeNav={this.closeNav} currentScreen={this.state.currentScreen} changeScreen={this.changeScreen}/>
        <Router currentScreen={this.state.currentScreen} />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));