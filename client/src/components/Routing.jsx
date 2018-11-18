import React from 'react';
import Home from './Home.jsx';
import About from './About.jsx';
import Portal from './Portal.jsx';
import JoinTheFun from './JoinTheFun.jsx';
import Accomodations from './Accomodations.jsx';
import Chat from './NestedComponents/Chat.jsx';

const Router = (props) => {
  let CS = props.currentScreen;

  if(CS === 'Home') {
    return <Home/>
  } else if (CS === 'About') {
    return (
    <div>
      <About/>
      <Chat open={props.chatOpen} loggedIn={props.loggedIn}  />  
    </div> 
      )
  } else if (CS === 'Accomodations') {
    return (
    <div>
      <Accomodations/>
      <Chat open={props.chatOpen} loggedIn={props.loggedIn} />  
    </div>
      )
  } else if (CS === 'Join The Fun') {
    return (
      <div>
        <JoinTheFun/>
        <Chat open={props.chatOpen} loggedIn={props.loggedIn} />  
      </div>
    ) 
  } else {
    return (
      <div>
        <Portal loggedIn={props.loggedIn} login={props.login} signUp={props.signUp} error={props.error} />
        <Chat open={props.chatOpen} loggedIn={props.loggedIn} />  
      </div>
    ) 
  }
}

export default Router;
