import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {createNewPoll, hideForm} from '../actions/index';
class CreateForm extends React.Component {

    submit = (e) => {
    e.preventDefault();
    this.props.submitSignup(this.refs.name.value, this.refs.email.value, this.refs.password.value);
    }
    
    render() {
        return (
                <form id="createform" onSubmit={this.submit}>
                    <div className="formtop">
                        Create New Poll
                        <span className="x" onClick={this.props.hideForm}>X</span>
                    </div>
                    <div className="form">
                        <div className="inputopts">Topic:</div>
                        <input ref="text" type="text" required/>

                    </div>
                    <div className="form">
                        <div className="inputopts">1:</div>
                        <input ref="Option1" type="text" required/>
                    </div>
                    <div className="form">
                        <div className="inputopts">2:</div>
                        <input ref="option2" type="text" required/>
                    </div>
                    <div className="submit">
                        <button type="submit">Submit</button>
                    </div>
                </form>
        );
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        createNewPoll,
        hideForm
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        form: state.form,
        messages: state.messages
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(CreateForm);
