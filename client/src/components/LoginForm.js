import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {submitLogin} from '../actions/index';
class LoginForm extends React.Component {
   submit = (e) => {
    e.preventDefault();
    this.props.submitLogin(this.refs.name.value, this.refs.password.value);
    }
    render() {
        return (
                <form onSubmit={this.submit} id="signinform" >
                    Name:
                    <input ref="name" type="text"/>
                    Password:
                    <input ref="password" type="password"/>
                    <button type="submit">Submit</button>
                </form>
        );
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        submitLogin,
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        messages: state.messages
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(LoginForm);
