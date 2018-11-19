import React from 'react';

class UserPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h3>Welcome Back, {this.props.userInfo.name},</h3>
      </div>
    )
  }
}


export default UserPortal;
