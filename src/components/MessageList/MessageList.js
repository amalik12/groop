import React, { Component } from 'react';
import { connect } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './MessageList.css';
import Message from '../Message';
import { Scrollbars } from 'react-custom-scrollbars';

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages
  }
}

export class MessageList extends Component {

  componentWillUpdate(nextProps, nextState) {
    if (this.scrollbars.getScrollHeight() - this.scrollbars.getScrollTop() === this.scrollbars.getClientHeight())
      this.scrollBot = true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.scrollBot)
      this.scrollbars.scrollToBottom();
    this.scrollBot = false;
  }

  render(){
    let messages = [];
    let prev = null;
    for (let index = 0; index < this.props.messages.length; index++) {
      let message = this.props.messages[index];
      let group_message = false
      if (prev !== null && prev.user._id === message.user._id &&
        (Date.parse(message.creation_time) - Date.parse(prev.creation_time)) / 1000 / 60 <= 30) {
          // group messages by the same author within 30 min together
          group_message = true;
      }
      messages.push(<CSSTransition
        key={index}
        classNames="message-anim"
        timeout={200}>
        <Message simple={group_message} {...message} />
      </CSSTransition>)
      prev = message
    }

    return (
      <Scrollbars
      renderThumbVertical={props => <div {...this.props} dispatch={null} className="thumb-vertical"/>}
      ref={(component) => {this.scrollbars = component}}
      >
      <div className="MessageList" id="chat-messages" ref={(element) => this.element = element }>
        <TransitionGroup>
          {messages}
        </TransitionGroup>
      </div>
      </Scrollbars>
    );
  }
}

export default connect(mapStateToProps)(MessageList);
