import React from 'react';
import { connect } from 'react-redux'

import { Button } from './styled'

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
    count: state.count,
});

const mapDispatch = ({ count: { increment, incrementAsync }}) => ({
    increment: () => increment(1),
    incrementAsync: () => incrementAsync(1),
});

export default connect(mapState, mapDispatch)(Home);
