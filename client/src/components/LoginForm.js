import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {submitLogin, hideForm} from '../actions/index';
class LoginForm extends React.Component {
   submit = (e) => {
    e.preventDefault();
    this.props.submitLogin(this.refs.name.value, this.refs.password.value);
    }
    
    render() {
        return (
                <form onSubmit={this.submit} id="loginform" >
                    <div className="formtop">
                        Log In
                        <span onClick={this.props.hideForm} className="x">X</span>
                    </div>
                    <div className="form">
                        <div className="inputopts">Name:</div>
                        <input ref="name" type="text" required/>
                    </div>
                    <div className="form">
                        <div className="inputopts">Password:</div>
                        <input ref="password" type="password" required/>
                    </div>
                    <div className="submit">
                        <button type="submit">Submit</button>
                    </div>
                </form>
        );
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        submitLogin,
        hideForm
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        messages: state.messages
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(LoginForm);
