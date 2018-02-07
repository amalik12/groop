import React from 'react';
import './App.css';
import Header from '../Header';
import MessageList from '../MessageList';
import Input from '../Input';
import SigninModal from '../SigninModal';
import MembersModal from '../MembersModal/MembersModal';

let App = (props) => {
  return (
    <div className="App">
      <SigninModal socket={props.socket} />
      <MembersModal />
      <Header />
      <MessageList />
      <Input />
    </div>
  );
}

export default App;