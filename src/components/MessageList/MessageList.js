import React from 'react';
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

let MessageList = ({messages}) => {
    
    return (
      <Scrollbars
      renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}>
      <div className="MessageList" id="chat-messages" ref={(element) => this.element = element }>
        <TransitionGroup>
          {messages.map((message, index) => (
            <CSSTransition
            classNames="message-anim"
            timeout={200}>
              <Message key={index} {...message} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      </Scrollbars>
    );
}

export default connect(mapStateToProps)(MessageList);
