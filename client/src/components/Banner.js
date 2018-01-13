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
        let options;
        if(this.props.userName) {
        options =  <div id="options">
                            <div className="userOpts" onClick={this.props.handleNewPoll}>New Poll</div>
                            <div className="userOpts" onClick={this.props.handleMyPolls}>My Polls</div>
                        </div>;
        } else options = <div/>;
        return (
            <div id="banner">
                <h1 id="welcome">{this.props.response}</h1>
                {options}
            </div>
    
        );
    }
}
export default Banner;