import React from 'react';
import {connect} from 'react-redux';
class Banner extends React.Component {
    
    render() {
        
        return (
            <div id="banner">
                <div id="bannerleft">
                    <img src="./bann1.png" alt="app" />
                </div>
                <div id="bannerright">
                    <img src="./bann2.png" alt="app" />
                </div>
                <h1 id="welcome">Poller</h1>
                <div id="notes">
                    <p>Vote on polls!</p>
                    <p>Create your own polls!</p>
                    <p>Share your polls!</p>
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        form: state.form
    };
}
export default connect(mapStateToProps)(Banner);