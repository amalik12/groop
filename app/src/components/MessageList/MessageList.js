import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './MessageList.css';
import MessageGroup from '../MessageGroup';
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
    let group = []
    let numGroups = 0
    for (let index = 0; index < this.props.messages.length; index++) {
      let message = this.props.messages[index];
      if (prev !== null && (prev.user._id !== message.user._id ||
        (Date.parse(message.creation_time) - Date.parse(prev.creation_time)) / 1000 / 60 > 30)) {
          // create a separaate message group if not from same author or not in 30 min period
          messages.push(<CSSTransition
            key={numGroups}
            classNames="message-anim"
            timeout={200}>
              <MessageGroup messages={group} />
            </CSSTransition>)
          group = []
          numGroups++;
      }
      group.push(message)
      prev = message
    }

    if (group.length)
      messages.push(<CSSTransition
        key={numGroups}
        classNames="message-anim"
        timeout={200}>
          <MessageGroup messages={group} />
        </CSSTransition>)

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
