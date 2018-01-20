import React, { Component } from 'react';
import './Message.css';
import Avatar from '../Avatar';
import Timestamp from '../Timestamp';

class Message extends Component {
  render() {
    return (
      <div className="Message">
        <Avatar />
        <div className="message-details">
        	<div className="message-info">
        		<span className="message-sender">{this.props.user.name}</span>
        		<span className="message-time"><Timestamp time={this.props.creation_time} /></span>
        	</div>
        	<div className="message-text">
        		{this.props.text}
        	</div>
        </div>
      </div>
    );
  }
}

export default Message;
