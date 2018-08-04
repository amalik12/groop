import React, { Component } from 'react';
import './Message.css';
import Avatar from '../Avatar';
import Timestamp from '../Timestamp';
import ReplyInput from '../ReplyInput/ReplyInput';
import { CSSTransition } from 'react-transition-group'
import moment from 'moment';
import SimpleMarkdown from 'simple-markdown';

var mdParse = SimpleMarkdown.defaultBlockParse;
var mdOutput = SimpleMarkdown.defaultReactOutput;

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = { replying: false };
    this.toggleReply = this.toggleReply.bind(this);
  }

  toggleReply() {
    this.setState({replying: !this.state.replying})
  }
  
  render() {
    let renderedText = mdOutput(mdParse(this.props.text));
    return (
      <div className="Message">
        <div className="message-left">
          {this.props.simple ? <span className="message-time">{moment(this.props.creation_time).format('h:mm A')}</span> : <Avatar user={this.props.user} />}
        </div>
        <div className={"message-details" + (this.props.simple ? ' simple' : '')}>
          {!this.props.simple && <div className="message-info">
            <span className="message-sender">{this.props.user.name}</span>
            <span className="message-time"><Timestamp time={this.props.creation_time} /></span>
          </div>}
          <div className="message-text">
            {renderedText}
          </div>
          <CSSTransition
            unmountOnExit={true}
            in={this.state.replying}
            classNames="reply-input-anim"
            timeout={200}>
            <ReplyInput toggleReply={this.toggleReply}/>
          </CSSTransition>
        </div>
        <div className="message-right">
          {!this.state.replying && <i onClick={this.toggleReply} className="material-icons reply-button">
            reply
          </i>}
        </div>
      </div>
    );
  }
}

export default Message;