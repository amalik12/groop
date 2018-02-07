import React from 'react';
import './Message.css';
import Avatar from '../Avatar';
import Timestamp from '../Timestamp';

let Message = (props) => {
  return (
    <div className="Message">
      <Avatar user={props.user} />
      <div className="message-details">
        <div className="message-info">
          <span className="message-sender">{props.user.name}</span>
          <span className="message-time"><Timestamp time={props.creation_time} /></span>
        </div>
        <div className="message-text">
          {props.text}
        </div>
      </div>
    </div>
  );
}

export default Message;