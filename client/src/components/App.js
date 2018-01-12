import React, { Component } from 'react';
import Header from './Header';
import Banner from './Banner';
import SignIn from './SignIn';
import PollsList from './PollsList';
import './App.css';

class App extends Component {
  state = {
    response: 'UglyPoller',
    signedIn: false,
    userName: '',
    polls: [],
    form: false,
    email: '',
    password: ''
  };
  componentWillMount() {
    this.callApiPolls()
      .then(res => this.setState({ 
        response: res.response,
        polls: res.polls
         }))
      .catch(err => console.log(err));
  }
  callApiPolls = async () => {
    const response = await fetch('/polls');
    let body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.userName,
        password: this.state.password,
        email: this.state.email
      })
    })
    let body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    this.setState({ 
        response: body.response,
        signedIn: body.signedIn,
        userName: body.userName,
        polls: body.polls,
        form: body.signedIn ? false: true
         });
  }
  handleSignInOut = () => {
    if(this.state.signedIn) { 
      this.setState({ signedIn: false,
                      response: 'Poller',
                      userName: '' });
    }
    else {
      this.setState({ form: true});
    }
  } 
  handleEmail = (e) => {this.setState({email: e.target.value})}
  handleUserName = (e) => {this.setState({userName: e.target.value})}
  handlePassword = (e) => {this.setState({password: e.target.value})}
  render() {
    if(!this.state.form) {
    return (
      <div className="app">
                <Header signIn={this.state.signedIn ? 'Sign Out':'Sign In'}
                        onClick={this.handleSignInOut}/>
                <Banner response={this.state.response}
                        userName={this.state.userName}/>
                <PollsList polls={this.state.polls}/>
      </div>

    );
    } else {
      return (
        <div className="app">
                <Header signIn={this.state.signedIn ? 'Sign Out':'Sign In'}
                        onClick={this.handleSignInOut}/>
                <SignIn handleSubmit={this.handleSubmit} 
                        handleEmail={this.handleEmail}
                        handleUserName={this.handleUserName}
                        handlePassword={this.handlePassword}/>
                <PollsList polls={this.state.polls}/>
        </div>
      );
    }
  }
}

export default App;
