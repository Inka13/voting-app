import React from 'react';
import {connect} from 'react-redux';
import UserForm from './UserForm';
class Banner extends React.Component {
    
    render() {
        if(this.props.form!=='') {
            return (
                <div id="banner">
                <UserForm />
                </div>);
        } 
        return (
            <div id="banner">
                <h1 id="welcome">Welcome</h1>
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