import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getOnePoll} from '../actions/index';
import Poll from './Poll';
class Menu extends Component {
    
    render() {
        if(this.props.polls){   
            return (
                    <div id="search">
                        <div className="searchopt">Latest</div>
                        <div className="searchopt">Popular</div>
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
export default connect(mapStateToProps, matchDispatchToProps)(Menu);