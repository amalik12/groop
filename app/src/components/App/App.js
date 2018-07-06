import React, { Component } from 'react';
import './App.css';
import { auth, getRoomInfo, getRoomMessages } from '../../actions';
import { connect } from 'react-redux';
import Header from '../Header';
import MessageList from '../MessageList';
import Input from '../Input';
import SigninModal from '../SigninModal';
import MembersModal from '../MembersModal';


const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.login.signed_in,
    shortid: state.room.shortid
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    auth: (token) => dispatch(auth(token)),
    getRoomInfo: (shortid) => dispatch(getRoomInfo(shortid)),
    getRoomMessages: (shortid) => dispatch(getRoomMessages(shortid))
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.initChat = this.initChat.bind(this);
  }

  componentDidMount() {
    let shortid = this.props.location.pathname.substr(1);
    this.props.getRoomInfo(shortid)
    .then((result) => this.props.auth(localStorage.getItem('token')))
    .then((result) => {
      if (this.props.isLoggedIn) {
        this.initChat();
      }
    })
    .catch((error) => console.error(error));
  }

  initChat() {
    let shortid = this.props.location.pathname.substr(1);
    this.props.socket.open();
    this.props.socket.emit("user", { room: shortid, user: localStorage.getItem('token') });
    return this.props.getRoomMessages(shortid);
  }
  
  render() {
    return (
      <div className="App">
        <SigninModal socket={this.props.socket} callback={this.initChat} />
        <MembersModal />
        <Header />
        <MessageList />
        <Input />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);