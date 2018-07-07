import React from 'react';
import './Message.css';
import Avatar from '../Avatar';
import Timestamp from '../Timestamp';
import moment from 'moment';
import SimpleMarkdown from 'simple-markdown';

var mdParse = SimpleMarkdown.defaultBlockParse;
var mdOutput = SimpleMarkdown.defaultReactOutput;

let Message = (props) => {
  let renderedText = mdOutput(mdParse(props.text));
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
          {renderedText}
        </div>
      </div>
      <div className="message-right">
        <i class="material-icons reply-button">
          reply
        </i>
      </div>
    </div>
  );
}

export default Message;