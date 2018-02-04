import React, { Component } from 'react';
import TextField from '../TextField';
import FormModal from '../FormModal';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', loading: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.submit = this.submit.bind(this);
    var timer;
  }
  
  handleChange(event) {
    if (event.target.name === "Username") {
      this.setState({ username: event.target.value});
    } else {
      this.setState({ password: event.target.value });
    }
    this.props.setError('');
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!event.target.value.trim()) {
        return
      }
      if (this.state.username && this.state.password) {
        this.submit();
      }
    }
  }

  submit() {
    var myHeaders = new Headers();
    this.setState({ loading: true });
    myHeaders.append("Content-Type", "application/json");
    fetch("/login", { method: 'POST', body: JSON.stringify({ name: this.state.username, password: this.state.password }), headers: myHeaders })
    .then((result) => {
      if (result.status !== 200) {
        this.props.setError('Username/password is incorrect');
        throw new Error(result.status);
      }
      return result.json()
    })
    .then(result => this.props.signin(result))
    .then((result) => { this.setState({ loading: false }) })
    .catch(error => { console.error(error); this.setState({ loading: false }); })
  }
  
  render() {
    return (
      <FormModal title="Login" showModal={this.props.showModal} submitted={this.props.submitted} submit={this.submit} loading={this.state.loading} enabled={this.state.username && this.state.password}>
        <TextField label="Username" onKeyPress={this.handleKeyPress} value={this.state.username} handleChange={this.handleChange} errorText={this.props.error}/>
        <TextField label="Password" onKeyPress={this.handleKeyPress} password={true} value={this.state.password} handleChange={this.handleChange} />
        <span className="link" onClick={this.props.switch}>Create an account</span>
      </FormModal>
    );
  }
}

export default LoginModal;