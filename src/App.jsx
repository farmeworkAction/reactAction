import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Header from './compoments/header/index';
import Nav from './compoments/nav/index';

import Home from './container/home/index';
import About from './container/about/index';
import Topics from './container/topics/index';
import Form from './container/form/index';

export default class App extends React.Component {
	constructor () {
    super()
  }

	render () {
    return (
      <div>
        <Header>
          <Nav />
        </Header>
        <Router>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/topics">Topics</Link></li>
              <li><Link to="/form">form</Link></li>
            </ul>

            <hr/>

            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/topics" component={Topics}/>
            <Route path="/form" component={Form}/>
          </div>
        </Router>
      </div>
		)
	}
}
