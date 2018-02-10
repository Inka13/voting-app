import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getLatest, getPopular} from '../actions/index';

class Menu extends Component {
    
    render() {
        if(this.props.polls){   
            return (
                    <div id="search">
                        <div className="searchopt" onClick={() => this.props.getLatest()}>Latest</div>
                        <div className="searchopt" onClick={() => this.props.getPopular()}>Popular</div>
                       
                    </div>
            );
        }
        return (<div></div>);
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getLatest,
        getPopular
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        polls: state.polls
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(Menu);