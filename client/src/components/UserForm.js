import React from 'react';
import SigninForm from './SigninForm';
import LoginForm from './LoginForm';

class UserForm extends React.Component {
    
    render() {
        let messageList = [];
        this.props.messages.forEach((message, i) => {
            messageList.push(<li key={i}>{message}</li>);
        });
        if(this.props.action==='signin') {
            return (
                <div id="banner">
                    <SigninForm handleEmail={this.props.handleEmail}
                                handleUserName={this.props.handleUserName}
                                handlePassword={this.props.handlePassword}
                                handleSubmit={this.props.handleSubmit}/>
                    <ul>{messageList}<br/></ul><br/>
                </div>
            );
        } else return (
                <div id="banner">
                    <LoginForm  handleUserName={this.props.handleUserName}
                                handlePassword={this.props.handlePassword}
                                handleLogin={this.props.handleLogin}/>
                    <ul>{messageList}<br/></ul><br/>
                </div>
        );
    }
}
export default UserForm;