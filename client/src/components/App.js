import React, { Component } from 'react';
import Header from './Header';
import Banner from './Banner';
import PollsList from './PollsList';
import './App.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getAllPolls} from '../actions/index';

class App extends Component {
  componentWillMount() {
    this.props.getAllPolls();

  }
  
  render() {
    
    
    if(this.props.user!=={}) {
      return (
        <div className="app">
          <Header />
          <Banner />
          <PollsList />
        </div>
      );
    } 
      return (
        <div className="app">
          <Header />
          <PollsList />
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
        user: state.user
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(App);


