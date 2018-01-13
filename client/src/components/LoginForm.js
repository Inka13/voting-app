import React from 'react';

class LoginForm extends React.Component {
   
    render() {
        return (
                <form id="signinform" >
                    Name:
                    <input onChange={this.props.handleUserName} type="text" name="userName" />
                    Password:
                    <input onChange={this.props.handlePassword} type="password" name="password"/>
                    <input type="submit" value="Submit" onClick={this.props.handleLogin}/>
                </form>
        );
    }
}
export default LoginForm;