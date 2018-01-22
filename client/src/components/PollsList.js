import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getOnePoll} from '../actions/index';
import Menu from './Menu';
import Poll from './Poll';
class PollsList extends Component {
    createList() {
        const list = [];
         this.props.polls.forEach((poll, i) => {
              list.push(<Poll key={i} poll={poll} getOne={this.props.getOnePoll}/>);
        });
        return list;
    }
    render() {
        if(this.props.polls){   
            return (
            <div>
            <Menu/>
                <main>
                    
                    {this.createList()}    
                <div className="clear" />
                </main>
                </div>
            );
        }
        return (<div></div>);
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getOnePoll,
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        polls: state.polls
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(PollsList);