import React from 'react';

class SigninForm extends React.Component {
    
    render() {
        return (
                <form id="signinform" >
                    E-mail:
                    <input onChange={this.props.handleEmail} type="email" name="email" placeholder="example@ex.com"/>
                    Name:
                    <input onChange={this.props.handleUserName} type="text" name="userName" />
                    Password:
                    <input onChange={this.props.handlePassword} type="password" name="password"/>
                    <input type="submit" value="Submit" onClick={this.props.handleSubmit}/>
                </form>
        );
    }
}
export default SigninForm;