import React from 'react';
import {
  HashRouter as Router
} from 'react-router-dom'

import { renderRoutes } from 'react-router-config'
import routes from './routes'

import Header from './compoments/header/index';

export default class App extends React.Component {
	constructor () {
    super()
  }

	render () {
    return (
      <Router>
          <div>
              <Header />
              {renderRoutes(routes)}
          </div>
      </Router>
		)
	}
}
