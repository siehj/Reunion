import React from 'react';

const Router = (props) => {
  <div>
    <h3>{this.state.currentScreen === 'Home' ? 'Family Time' : props.currentScreen}</h3> 
    {  // NAVIGATION BAR CONTENT 
      props.navScreens.map((screen, idx) => {
        if(screen !== props.currentScreen) {
          return <a key={idx} name={screen} onClick={this.changePage.bind(this, screen)}>{screen}</a>
        } 
      }
    )}
  </div>
}

export default Router;
