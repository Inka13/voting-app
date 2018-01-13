import React, { Component } from 'react';
import Header from './Header';
import Banner from './Banner';
import UserForm from './UserForm';
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
    password: '',
    messages: []
  };
  componentWillMount() {
    this.getAllPolls()
      .then(res => 
        this.setState({ 
        response: res.response,
        polls: res.polls
    }))
      .catch(err => console.log(err));
  }
  getAllPolls = async () => {
    const response = await fetch('/polls');
    let body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/users', {
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
    if (response.status !== 200) {
      this.setState({ 
        messages: body.response,
      });
    } else {
        this.setState({ 
            response: body.response,
            userName: body.createdUser.name,
            signedIn: true,
            form: false
        });
      }
  }
  handleSubmitLogin = async (event) => {
    event.preventDefault();
    const response = await fetch('/users/'+this.state.userName+'?password='+this.state.password);
    let body = await response.json();
    if (response.status !== 200) {
      this.setState({ 
        messages: body.response,
      });
    } else {
        this.setState({ 
            response: body.response,
            userName: body.user.name,
            signedIn: true,
            form: false
        });
      }
  }
  handleSignin = () => {
    if(this.state.signedIn) { 
      this.setState({ signedIn: false,
                      response: 'Poller',
                      userName: '' });
    }
    else {
      this.setState({ form: 'signin'});
    }
  } 
  handleLogin = () => {
    if(!this.state.signedIn) this.setState({ form: 'login'});
  } 
  handleNewPoll = () => {


  }
  handleMyPolls = async () => {
    const response = await fetch('/polls/my/' + this.state.userName);
    let body = await response.json();
    if (response.status !== 200) {
      this.setState({ 
        messages: body.response,
      });
    } else {
        this.setState({ 
            response: body.response,
            polls: body.polls
        });
      }
  }
  handleEmail = (e) => {this.setState({email: e.target.value})}
  handleUserName = (e) => {this.setState({userName: e.target.value})}
  handlePassword = (e) => {this.setState({password: e.target.value})}
  render() {
    if(!this.state.form) {
    return (
      <div className="app">
                <Header login={this.state.signedIn ?  this.state.userName : 'Log in'}
                        signin={this.state.signedIn ? 'Log Out':'Sign In'}
                        handleLogin={this.handleLogin}
                        handleSignin={this.handleSignin}/>
                <Banner response={this.state.response}
                        userName={this.state.userName}
                        handleNewPoll={this.handleNewPoll}
                        handleMyPolls={this.handleMyPolls}/>
                <PollsList polls={this.state.polls}/>
      </div>

    );
    } else {
      return (
        <div className="app">
                <Header login={this.state.signedIn ?  this.state.userName : 'Log in'}
                        signin={this.state.signedIn ? 'Log Out':'Sign In'}
                        handleLogin={this.handleLogin}
                        handleSignin={this.handleSignin}/>
                <UserForm action={this.state.form}
                        messages={this.state.messages}
                        handleSubmit={this.handleSubmit} 
                        handleLogin={this.handleSubmitLogin} 
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
