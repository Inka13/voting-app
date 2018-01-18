import React from 'react';
import SigninForm from './SigninForm';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
class UserForm extends React.Component {
    
    render() {
        const messageList = [];
        if(this.props.messages!==[]) {
            this.props.messages.forEach((message, i) => {
                messageList.push(<li key={i}>{message}</li>);
            });
        } 
        if(this.props.form==='signup') {
            return (
                <div id="banner">
                    <SigninForm />
                    <ul>{messageList}<br/></ul><br/>
                </div>
            );
        } else if(this.props.form==='login') {
            return (
                <div id="banner">
                    <LoginForm />
                    <ul>{messageList}<br/></ul><br/>
                </div>
            );
        }
        return <span/>
    }
}

function mapStateToProps(state) {
    return {
        form: state.form,
        messages: state.messages
    };
}
export default connect(mapStateToProps)(UserForm);
