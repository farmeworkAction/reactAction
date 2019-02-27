import React from 'react';

import WithLogin from '../withLogin';

@WithLogin
class Nav extends React.Component {
  render () {
    return (
        <div>
        Nav list
            {this.props.name}
        </div>
    );
  }

}

export default Nav;
