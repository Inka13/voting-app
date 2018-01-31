import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {hideForm, deletePoll} from '../actions/index';

class ConfirmDelete extends React.Component {
    
    render() {
    	console.log(this.props.user._id);
        return (
                <div id="deleteform" >
                    <div className="formtop">
                    Confirm Delete
                        
                    </div>
                    <div className="alert">
                        Are you sure you want to delete this poll?
                        <div className="yesNo" onClick={() => this.props.deletePoll(this.props.user._id, this.props.activePoll.id)}>YES</div>
                       <div className="yesNo" onClick={this.props.hideForm}>NO</div>
                    </div>
                </div>
        );
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
    	deletePoll,
        hideForm
    }, dispatch);
}
function mapStateToProps(state) {
    return {
    	activePoll: state.activePoll,
        form: state.form,
        user: state.user
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(ConfirmDelete);
