import React from 'react';
import { connect } from 'react-redux'

import {Button} from './styled'

class About extends React.Component {

    render(){
        return(
            <div>
                The count is {this.props.data}
                <Button onClick={this.props.increment}>increment</Button>
                <Button onClick={this.props.incrementAsync}>incrementAsync</Button>
            </div>
        )
    }
}

const mapState = state => ({
    data: state.data,
})

const mapDispatch = ({ data: { increment, incrementAsync }}) => ({
    increment: () => increment(2),
    incrementAsync: () => incrementAsync(2),
})


export default connect(mapState, mapDispatch)(About);
