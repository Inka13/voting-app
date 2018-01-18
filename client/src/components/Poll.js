import React, {Component} from 'react';
import {connect} from 'react-redux'


class Poll extends Component {
    
    render() {
        return (
            <div>
                <p>{this.props.poll ? this.props.poll.options : ''}</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        poll: state.activePoll
    };
}
export default connect(mapStateToProps)(Poll);