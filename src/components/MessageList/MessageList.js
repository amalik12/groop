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

class MessageList extends Component {

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
    return (
      <Scrollbars
      renderThumbVertical={props => <div {...this.props} className="thumb-vertical"/>}
      ref={(component) => {this.scrollbars = component}}
      >
      <div className="MessageList" id="chat-messages" ref={(element) => this.element = element }>
        <TransitionGroup>
          {this.props.messages.map((message, index) => (
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
}

export default connect(mapStateToProps)(MessageList);
