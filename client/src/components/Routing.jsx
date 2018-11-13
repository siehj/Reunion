import React from 'react';
import Home from './Home.jsx';
import About from './About.jsx';
import Portal from './Portal.jsx';
import JoinTheFun from './JoinTheFun.jsx';
import Accomodations from './Accomodations.jsx';

const Router = (props) => {
  let CS = props.currentScreen;

  if(CS === 'Home') {
    return <Home/>
  } else if (CS === 'About') {
    return <About/>
  } else if (CS === 'Accomodations') {
    return <Accomodations/>
  } else if (CS === 'Join The Fun') {
    return <JoinTheFun/>
  } else {
    return <Portal loggedIn={props.loggedIn} login={props.login} signUp={props.signUp} />
  }
}

export default Router;
