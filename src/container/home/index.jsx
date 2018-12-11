import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {Button} from './styled'

class Home extends React.Component {
    
    render(){
        return(
            <div>
                The count is {this.props.count}
                <Button onClick={this.props.increment}>increment</Button>
                <Button onClick={this.props.incrementAsync}>incrementAsync</Button>
            </div>
        )
    }
}

const mapState = state => ({
    count: state.count
})
  
const mapDispatch = ({ count: { increment, incrementAsync }}) => ({
    increment: () => increment(1),
    incrementAsync: () => incrementAsync(1)
})

Home.propTypes = {
    count: PropTypes.number,
    increment: PropTypes.func,
    // incrementAsync: PropTypes.func,
  };

export default connect(mapState, mapDispatch)(Home);