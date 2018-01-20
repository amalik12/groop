import React, { Component } from 'react';
import './App.css';
import Header from '../Header';
import MessageList from '../MessageList';
import Input from '../Input';
import LoginModal from '../LoginModal';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<LoginModal socket={this.props.socket} />
				<Header />
				<MessageList />
    		<Input />
      </div>
    );
  }
}

export default App;