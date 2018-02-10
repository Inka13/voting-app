import React, { Component } from 'react';
import Header from './Header';
import Banner from './Banner';
import PollsList from './PollsList';
import SigninForm from './SigninForm';
import LoginForm from './LoginForm';
import CreateForm from './CreateForm';
import ActivePoll from './ActivePoll';
import Alert from './Alert';
import GetOne from './GetOne';
import Footer from './Footer';
import ConfirmDelete from './ConfirmDelete';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getAllPolls, getIP} from '../actions/index';

class App extends Component {
  componentWillMount() {
    this.props.getAllPolls();
    this.props.getIP();
  }
  render() {
      return (
        <Router>

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

           {this.props.form==='alert' ? 
          <div className="formback">
           <Alert /></div> : <span/>}

           {this.props.form==='confirm' ? 
          <div className="formback">
           <ConfirmDelete /></div> : <span/>}

          <Header />
          
          {this.props.user.name ? <span/> : <Banner />}
           {this.props.activePoll.id ? <ActivePoll/> : <PollsList />}
         <Route path={"/:id"} component={GetOne} />
         <Footer />
        </div>
        
         
        </Router>
      );
  }
}; 
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
      getAllPolls,
      getIP
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


