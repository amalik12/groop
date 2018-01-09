import React, { Component } from 'react';
import './App.css';
import Header from '../Header';
import MessageList from '../MessageList';
import Input from '../Input';
import io from 'socket.io-client';
import { connect } from 'react-redux'
import { addMessage, setUserCount, setRoomInfo } from '../../actions'
import LoginModal from '../LoginModal';
let socket;

const mapStateToProps = (state = {}) => {
    return {...state};
};

class App extends Component {
	constructor(props) {
		super(props);
		const {dispatch} = this.props;
		socket = io();
		socket.on('message', function(msg){
			dispatch(addMessage(msg))
		});

		socket.on('user count', function(count){
			dispatch(setUserCount(count))
		});

		socket.on('room info', function(room){
			dispatch(setRoomInfo(room))
		});
	}

  render() {
    return (
      <div className="App">
      	<LoginModal />
    	<Header />
		<MessageList />
    	<Input socket={socket}/>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App)
