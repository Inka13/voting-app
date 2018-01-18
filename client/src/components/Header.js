import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {showSignupForm, showLoginForm, getMyPolls,
        createNewPoll, showcreateNewPollForm, 
        userLogout} from '../actions/index';

class Header extends React.Component {
    render() {
        let myOptions;
        if(this.props.user.name) {
            myOptions = <div><div className="myoptions" onClick={() => this.props.getMyPolls(this.props.user.id)}>My Polls</div>
                            <div className="myoptions" onClick={() => this.props.showcreateNewPollForm()}>Create new</div></div>;
        } else myOptions= <div/>;
        return (
            <header>
                <div id="title"><h3>Voting App</h3></div>
                <div className="myoptions">Home</div>
                {myOptions}
                <div id="signin" onClick={this.props.user.name ? () => this.props.userLogout() : () => this.props.showSignupForm()}>{this.props.user.name ? 'Sign Out' : 'Sign In'}</div>
                <div id="login" onClick={this.props.user.name ? () => {} : () => this.props.showLoginForm()}>{this.props.user.name ? this.props.user.name : 'Log in'}</div>
            </header>
        );
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        showSignupForm,
        showLoginForm,
        getMyPolls,
        createNewPoll,
        showcreateNewPollForm,
        userLogout
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        user: state.user
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(Header);