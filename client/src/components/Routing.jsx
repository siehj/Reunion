import React from 'react';
import Home from './Home.jsx';
import About from './About.jsx';

const Router = (props) => {
  let CS = props.currentScreen;

  if(CS === 'Home') {
    return <Home/>
  } else if (CS === 'About') {
    return <div id="About" >About</div>
  } else if (CS === 'Accomodations') {
    return <div id="Acc">Accomodations!!!!!!!!!!!!!!!!!!</div>
  } else if (CS === 'Join The Fun') {
    return <div id="JTF" >Join The Fun</div>
  } else {
    return <div id="Portal" >Portal</div>
  }
}

export default Router;
