import React, { Component } from 'react';
import { connect } from "react-redux";
import { signin, addMessages } from '../../actions';
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';

const mapStateToProps = (state, ownProps) => {
  return {
    showModal: state.modals.signin,
    room_id: state.room._id
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signin: () => dispatch(signin()),
    addMessages: (messages) => dispatch(addMessages(messages))
  }
}

export class SigninModal extends Component {
  constructor(props) {
    super(props);
    this.switchModal = this.switchModal.bind(this);
    this.setError = this.setError.bind(this);
    this.signin = this.signin.bind(this);
    this.state = {showLogin: true, submitted: false, error: ''}
  }
  
  signin(data) {
    return new Promise((resolve, reject) => {
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        resolve(fetch("/api/v1/rooms/" + this.props.room_id + '/messages', { headers: { 'Authorization': localStorage.getItem('token') } }));
      } else if (!this.state.error) {
        this.setState({ error: 'An error occured.' });
      }
    })
    .then(
      (result) => {
        if (result.status === 200) {
          return result.json();
        } else {
          console.log('Error retrieving messages');
          // TODO: alert user
        }
      },
      (error) => {
        console.log(error);
      }
    )
    .then((data) => {
      this.props.addMessages(data);
      this.props.socket.open();
      this.props.socket.emit("user", { room: this.props.room_id, user: localStorage.getItem('token') });
      this.setState({ submitted: true });
      this.props.signin();
    })
  }
  
  setError(text) {
    this.setState({error: text});
  }
  
  switchModal() {
    this.setState({showLogin: !this.state.showLogin, error: ''})
  }
  
  render() {
    let content;
    if (this.state.showLogin) {
      content = <LoginModal showModal={this.props.showModal} signin={this.signin} switch={this.switchModal} setError={this.setError} submitted={this.state.submitted} error={this.state.error} />
    } else {
      content = <RegisterModal showModal={this.props.showModal} signin={this.signin} switch={this.switchModal} setError={this.setError} submitted={this.state.submitted} error={this.state.error} />
    }
    return (
      <div>
      {content}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninModal);