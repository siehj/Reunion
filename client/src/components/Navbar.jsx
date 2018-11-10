import React from 'react';

const NavBar = (props) => (
  <div id="Nav">
    <a className="closebtn" onClick={props.closeNav} >&times;</a>
  </div>
);

export default NavBar;
