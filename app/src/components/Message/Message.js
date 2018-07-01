import React from 'react';
import './Message.css';
import Avatar from '../Avatar';
import Timestamp from '../Timestamp';
import moment from 'moment';

let Message = (props) => {
  return (
    <div className="Message">
      <div className="message-left">
        {props.simple ? <span className="message-time">{moment(props.creation_time).format('h:mm A')}</span> : <Avatar user={props.user} />}
      </div>
      <div className={"message-details" + (props.simple ? ' simple' : '')}>
        {!props.simple && <div className="message-info">
          <span className="message-sender">{props.user.name}</span>
          <span className="message-time"><Timestamp time={props.creation_time} /></span>
        </div>}
        <div className="message-text">
          {props.text}
        </div>
      </div>
    </div>
  );
}

export default Message;