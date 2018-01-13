import React from 'react';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <header>
                <div id="title"><h3>Voting App</h3></div>
                <div id="signin" onClick={this.props.handleSignin}>{this.props.signin}</div>
                <div id="login" onClick={this.props.handleLogin}>{this.props.login}</div>
            </header>
        );
    }
}
export default Header;