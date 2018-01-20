import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {hideForm} from '../actions/index';

class Alert extends React.Component {
    
    render() {
        return (
                <div id="alertform" >
                    <div className="formtop">
                    Alert
                        <span className="x" onClick={this.props.hideForm}>X</span>
                    </div>
                    <div className="alert">
                        This user/ip already voted on this matter.
                       
                    </div>
                </div>
        );
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        hideForm
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        form: state.form,
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(Alert);
