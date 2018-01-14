import React from 'react';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render() {
        let myOptions;
        if(this.props.login!=='Log in') {
            myOptions = <div><div className="myoptions" onClick={this.props.handleMyPolls}>My Polls</div>
                            <div className="myoptions" onClick={this.props.handleNewPoll}>Create new</div></div>;
        } else myOptions= <div/>;
        return (
            <header>
                <div id="title"><h3>Voting App</h3></div>
                <div className="myoptions" onClick={this.props.handleHome}>Home</div>
                {myOptions}
                <div id="signin" onClick={this.props.handleSignin}>{this.props.signin}</div>
                <div id="login" onClick={this.props.handleLogin}>{this.props.login}</div>
            </header>
        );
    }
}
export default Header;