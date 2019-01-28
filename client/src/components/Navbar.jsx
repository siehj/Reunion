import React from 'react';
import { Button } from 'reactstrap'
import NavIcons from './NestedComponents/NavComponents/NavIcons.jsx';

const NavBar = (props) => (
  <div id="Nav">

  {props.status ?
    <div>
      {props.currentScreen === "Home" ? <a className="closebtn" onClick={props.closeNav} >&times;</a> : null }
      <h3>{props.currentScreen === 'Home' ? 'Family Time' : props.currentScreen}</h3> 
      {  // NAVIGATION BAR CONTENT 
        props.navScreens.map((screen, idx) => {
          if(screen !== props.currentScreen) {
            return <a key={idx} name={screen} onClick={props.changeScreen}>{screen}</a>
          } 
        }
      )}
      <NavIcons />
      { props.loggedIn ? 
        <Button id="logoutBtn" outline color="secondary" block onClick={props.logout} >Log Out</Button>
        : null }
    </div> 
      : null
    }
  </div>
);

export default NavBar;
