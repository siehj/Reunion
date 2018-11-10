import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home.jsx';
import NavBar from './components/Navbar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      currentScreen: 'Home',
      navScreens: ['Home', 'About', 'Accomodations', 'Join The Fun', 'Portal']
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
  }
  
  closeNav() {
    document.getElementById("Nav").style.width = '0%';
  }

  changeScreen(e) {
    console.log(e.target);
  } 

  render() {
    return(
      <div id="application">
        <span onClick={this.openNav}>&#9776;</span>
        <NavBar navScreens={this.navScreens} closeNav={this.closeNav} />
        <Home/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));