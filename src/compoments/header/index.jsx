import React from 'react';
import {
  Link,
} from 'react-router-dom'

import Nav from '../nav/index';

class Header extends React.Component {
  render () {
    return (
        <div>
          header
            <Nav />
            {this.props.children}
            <ul className="nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/topics">Topics</Link></li>
                <li><Link to="/form">Form</Link></li>
            </ul>
        </div>
    );
  }

}


export default Header;
