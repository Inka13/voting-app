import React, { Component } from 'react';
import Header from './Header';
import Banner from './Banner';
import PollsList from './PollsList';
import './App.css';

class App extends Component {
  state = {
    response: 'Welcome',
    signedIn: false,
    userName: '',
    polls: [],
  };
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ 
        response: res.response,
        signIn: res.signIn,
        userName: res.userName,
        polls: res.polls
         }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };
  handleSignInOut() {

  }
  render() {
    return (
      <div className="app">
                <Header signIn={this.state.signIn} onClick={this.handleSignInOut}/>
                <Banner response={this.state.response} userName={this.state.userName}/>
                <PollsList polls={this.state.polls}/>
        <p className="App-intro">
          {this.state.response}
        </p>
      </div>
    );
  }
}

export default App;
