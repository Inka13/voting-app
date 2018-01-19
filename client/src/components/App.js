import React, { Component } from 'react';
import Header from './Header';
import Banner from './Banner';
import PollsList from './PollsList';
import SigninForm from './SigninForm';
import LoginForm from './LoginForm';
import CreateForm from './CreateForm';
import ActivePoll from './ActivePoll';
import './App.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getAllPolls} from '../actions/index';

class App extends Component {
  componentWillMount() {
    this.props.getAllPolls();
  }
  render() {
      return (
        <div className="app">

          {this.props.form==='signup' ? 
          <div className="formback">
          <SigninForm /></div> : <span/>}
         
          {this.props.form==='login' ? 
          <div className="formback">
           <LoginForm /></div> : <span/>}

           {this.props.form==='create' ? 
          <div className="formback">
           <CreateForm /></div> : <span/>}

          <Header />
          {this.props.activePoll.id ? <ActivePoll/> : <PollsList />}
          {/*this.props.user.name ? <span/> : <Banner />*/}

          

        </div>
      );
  }
}; 
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
      getAllPolls
    }, dispatch);
}
function mapStateToProps(state) {
    return {
      form: state.form,
      user: state.user,
      activePoll: state.activePoll
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(App);


