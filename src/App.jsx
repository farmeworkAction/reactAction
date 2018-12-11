import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Home from './container/home/index.jsx';
import About from './container/about/index.jsx';
import Topics from './container/topics/index.jsx';

export default class App extends React.Component {
	constructor () {
    super()
  }

	render () {
    return (
      <div>
        <Router>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/topics">Topics</Link></li>
            </ul>

            <hr/>

            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/topics" component={Topics}/>
          </div>
        </Router>
      </div>
		)
	}
}

