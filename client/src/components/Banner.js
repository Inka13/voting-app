import React from 'react';

class Banner extends React.Component {
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
            <div id="banner">
                <h1 id="welcome">{this.props.response} {this.props.userName}!</h1>
                <div id="options">
                    <div class="userOpts">New Pole</div>
                    <div class="userOpts">My Poles</div>
                </div>
            </div>
    
        );
    }
}
export default Banner;