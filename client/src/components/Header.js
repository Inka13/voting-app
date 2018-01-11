import React from 'react';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentWillMount() {
    }
    componentDidMount(){
    }
    render() {
        return (
            <header>
                <div id="title"><h3>Voting App</h3></div>
                <div id="signIn">{this.props.signIn}</div>
            </header>
        );
    }
}
export default Header;