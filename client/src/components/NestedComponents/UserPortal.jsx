import React from 'react';

class UserPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <h1>Welcome Back, {this.props.userInfo.name}!</h1>
        
      </div>
    )
  }
}


export default UserPortal;
