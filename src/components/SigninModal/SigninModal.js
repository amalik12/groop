import React, { Component } from 'react';
import { connect } from "react-redux";
import { login, register, clearLoginError } from '../../actions';
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';

const mapStateToProps = (state, ownProps) => {
  return {
    error: state.login.error,
    showModal: state.modals.signin
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (username, password, socket) => dispatch(login(username, password, socket)),
    register: (username, password, socket) => dispatch(register(username, password, socket)),
    clearLoginError: () => dispatch(clearLoginError())
  }
}

export class SigninModal extends Component {
  constructor(props) {
    super(props);
    this.switchModal = this.switchModal.bind(this);
    this.state = { showLogin: true }
  }

  switchModal() {
    this.setState({ showLogin: !this.state.showLogin});
    this.props.clearLoginError();
  }
  
  render() {
    let content;
    if (this.state.showLogin) {
      content = <LoginModal showModal={this.props.showModal} socket={this.props.socket} submit={this.props.login}
        callback={this.props.callback} switch={this.switchModal} clearLoginError={this.props.clearLoginError} error={this.props.error} />
    } else {
      content = <RegisterModal showModal={this.props.showModal} socket={this.props.socket} submit={this.props.register}
      callback={this.props.callback} switch={this.switchModal} clearLoginError={this.props.clearLoginError} error={this.props.error} />
    }
    return (
      <div>
      {content}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninModal);