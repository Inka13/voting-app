import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {showSignupForm, showLoginForm, getAllPolls, 
        getMyPolls,
        createNewPoll, showcreateNewPollForm, 
        userLogout} from '../actions/index';

class Header extends React.Component {
    openmenu = () => {
        this.refs.nav.classList.toggle('activenav');
    }
    render() {
        let myOptions;
        
        if(this.props.user.name) {
            myOptions = <div><div className="myoptions" onClick={() => this.props.getMyPolls(this.props.user._id)}>My Polls</div>
                            <div className="myoptions" onClick={() => this.props.showcreateNewPollForm()}>Create new</div></div>;
        } else myOptions= <div/>;
        return (
            <header>
                <div id="title" onClick={() => this.props.getAllPolls()}>Poller</div>
                <span className="icon" onClick={() => this.openmenu()}>&#9776;</span>
                 <div ref="nav" className="nav">
                    
                    <div className="myoptions" onClick={() => this.props.getAllPolls()}>Home</div>
                    {myOptions}
                    <div className="login" onClick={this.props.user.name ? () => {} : () => this.props.showLoginForm()}>{this.props.user.name ? this.props.user.name : 'Log in'}</div>
                    <div className="signin" onClick={this.props.user.name ? () => this.props.userLogout() : () => this.props.showSignupForm()}>{this.props.user.name ? 'Sign Out' : 'Sign In'}</div>
                </div>
            </header>
        );
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        showSignupForm,
        showLoginForm,
        getAllPolls,
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