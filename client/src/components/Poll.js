import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {confirmDelete} from '../actions/index';
class Poll extends Component {
    
    render() {
        const voted = this.props.poll.voters.indexOf(this.props.user._id);
        return (
            <div className="pollbox" onClick={() => this.props.getOne(this.props.poll.id)}>
                {voted>-1 ? <span className="votedmark">VOTED</span> : <span/>}
                
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
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        confirmDelete
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        user: state.user
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(Poll);

