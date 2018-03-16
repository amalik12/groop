import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '../TextField';
import FormModal from '../FormModal';

const mapStateToProps = (state, ownProps) => {
  return {
    room_id: state.room.shortid
  }
}

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', loading: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.submit = this.submit.bind(this);
  }
  
  handleChange(event) {
    if (event.target.name === "Username") {
      this.setState({ username: event.target.value });
    } else {
      this.setState({ password: event.target.value });
    }
    this.props.clearLoginError();
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (this.state.username && this.state.password) {
        this.submit();
      }
    }
  }

  submit() {
    this.setState({ loading: true });
    this.props.submit(this.state.username, this.state.password, this.props.socket)
    .then(result => this.props.callback(this.props.room_id))
    .then((result) => {
      this.setState({ loading: false });
    },
      (error) => {
        console.error(error);
        this.setState({ loading: false });
    });
  }
  
  render() {
    return (
      <FormModal title="Login" showModal={this.props.showModal} submitted={!this.props.showModal} submit={this.submit} loading={this.state.loading} enabled={this.state.username && this.state.password}>
        <TextField label="Username" onKeyPress={this.handleKeyPress} value={this.state.username} handleChange={this.handleChange} errorText={this.props.error}/>
        <TextField label="Password" onKeyPress={this.handleKeyPress} password={true} value={this.state.password} handleChange={this.handleChange} />
        <span className="link" onClick={this.props.switch}>Create an account</span>
      </FormModal>
    );
  }
}

export default connect(mapStateToProps)(LoginModal);