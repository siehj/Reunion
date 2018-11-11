import React from 'react';

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
    </div> 
      : null
    }
  </div>
);

export default NavBar;
