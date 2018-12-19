import React from 'react';

class Header extends React.Component {
  render () {
    return (
      <div>
        header
        {this.props.children}
      </div>
    );
  }

}


export default Header;
