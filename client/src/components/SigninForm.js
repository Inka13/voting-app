import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {submitSignup} from '../actions/index';
class SigninForm extends React.Component {

    submit = (e) => {
    e.preventDefault();
    this.props.submitSignup(this.refs.name.value, this.refs.email.value, this.refs.password.value);
    }
    
    render() {
        return (
                <form id="signinform" onSubmit={this.submit}>
                    E-mail:
                    <input ref= "email" type="email" name="email" placeholder="example@ex.com"/>
                    Name:
                    <input ref="name" type="text" name="userName" />
                    Password:
                    <input ref="password" type="password" name="password"/>
                    <button type="submit">Submit</button>
                </form>
        );
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        submitSignup
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        form: state.form,
        messages: state.messages
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(SigninForm);
