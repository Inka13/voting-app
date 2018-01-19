import React from 'react';
import {connect} from 'react-redux';
class Banner extends React.Component {
    
    render() {
        
        return (
            <div id="banner">
                <h1 id="welcome">Poller</h1>
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