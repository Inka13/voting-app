import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getOnePoll} from '../actions/index';

class GetOne extends React.Component {
    componentWillMount = () => {
        this.props.getOnePoll(this.props.match.params.id);
    }
    render() {
        return (
            <div>
            
            </div>
        );
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getOnePoll
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        user: state.user
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(GetOne);