import React from 'react';
import { Button } from 'antd';
import {
  HashRouter as Router,
} from 'react-router-dom'

import { renderRoutes } from 'react-router-config'
import routes from './routes'

import Header from './compoments/header/index';

export default class App extends React.Component {
	constructor (props) {
    super(props)
  }

	render () {
    return (
        <Router>
            <div>
                <Header />
                <Button type="primary">Primary</Button>
                {renderRoutes(routes)}
            </div>
        </Router>
		)
	}
}
