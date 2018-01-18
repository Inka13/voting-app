import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getOnePoll} from '../actions/index';
import Poll from './Poll'
class PollsList extends Component {
    createList() {
        const list = [];
         this.props.polls.forEach((poll) => {
              list.push(<li key={poll.id} onClick={ () => this.props.getOnePoll(poll)}><a href={poll.request.url}>{poll.question}</a></li>);
        });
        return list;
    }
    render() {
        
            // need to put a loader here  <<<<<======
         if(this.props.polls){   
        return (
            <main>
                <Poll />
                <ul>
                    {this.createList()}    
                </ul>
            </main>
        );
    } else {
        return (<p>Nothing...</p>);
    }
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getOnePoll
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        polls: state.polls
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(PollsList);