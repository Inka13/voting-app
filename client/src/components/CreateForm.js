import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {createNewPoll, hideForm, addOption, deleteOption} from '../actions/index';
class CreateForm extends React.Component {
    submit = (e) => {
        e.preventDefault();
        const options = [];
        const num = this.props.options;
        for(let i=1; i<=num; i++) {           
            this.refs["opt" +i].value && options.push(this.refs["opt" + i].value);
        }
    this.props.createNewPoll(this.refs.topic.value, options, this.props.user._id);
    }

    createList = () => {
        const list =[];
        let num = this.props.options;
        for (let i=1; i<=num; i++) {
            list.push(<div key={i} id={"opt" + i} className="form">
                            <div className="inputopts">Option {i}:</div>
                            {i<3 ? <input ref={"opt" +i} type="text" required/> :
                            <input ref={"opt" +i} type="text" />}
                            {(i===num && i>2) ? <span onClick={() => this.props.deleteOption()}>X</span> :  <span/>}
                        </div>);
        }
        return list;
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
                        <input ref="topic" type="text" required/>
                    </div>
                    
                        {this.createList()}
                    
                     <div className="form">
                        <div id="addOption" onClick={() => this.props.addOption()}>
                        + Add Option
                        </div>
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
        hideForm,
        addOption,
        deleteOption
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        user: state.user,
        form: state.form,
        messages: state.messages,
        options: state.options
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(CreateForm);
