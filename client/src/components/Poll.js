import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class Poll extends Component {
    
    render() {
        
        return (
            <div className="pollbox" onClick={() => this.props.getOne(this.props.poll.id)}>
                <div className="titles">{this.props.poll.question}</div>
                <div className="pollbox-bottom">
                    <span className="legend"><span>By: </span>{this.props.poll.posted_by}</span>
                    <span className="legend votes"><span>Votes: </span>{this.props.poll.votes}</span>
                    <span className="legend on"><span>On: </span>{this.props.poll.posted_on.slice(0, 10)}</span>
                </div>
            </div>
        );
    }
}


export default Poll;