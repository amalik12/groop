import React, { Component } from 'react';
import './App.css';
import Header from '../Header';
import MessageList from '../MessageList';
import Input from '../Input';
import SigninModal from '../SigninModal';
import MembersModal from '../MembersModal/MembersModal';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<SigninModal socket={this.props.socket} />
        <MembersModal />
				<Header />
				<MessageList />
    		<Input />
      </div>
    );
  }
}

export default App;