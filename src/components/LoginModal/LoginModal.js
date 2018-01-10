import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions';
import ReactModal from 'react-modal';
import TextField from '../TextField';
import '../Modal/Modal.css';

const mapStateToProps = (state, ownProps) => {
  return {
    showModal: !state.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: () => dispatch(login())
  }
}

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '', errorText: '', enabled: false, loading: false, showModal: true};
    this.handleChange = this.handleChange.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
    this.submit = this.submit.bind(this);
    var timer;
  }
  
  handleChange(event) {
    clearTimeout(this.timer);
    this.setState({value: event.target.value, errorText: '', enabled: false});
    this.timer = setTimeout(this.checkUsername, 700);
  }
  
  checkUsername() {
    this.setState({ loading: true });
    if (this.state.value) {
      fetch("/api/v1/users?name=" + this.state.value, { method: 'HEAD'})
      .then(
        (result) => {
          if (result.status === 200) {
            this.setState({enabled: true});
          } else {
            this.setState({enabled: false, errorText: 'User does not exist'});
          }
        },
        (error) => {
          console.log(error);
        }
      )
    }
    this.setState({loading: false});
  }
  
  submit() {
    this.setState({ loading: true });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch("/login", { method: 'POST', body: JSON.stringify({ name: this.state.value }), headers: myHeaders })
    .then((result) => { return result.json() })
    .then(
      (data) => {
        if (data && data.token) {
          localStorage.setItem('token', data.token);
          this.setState({ submitted: true});
          this.props.login();
        } else {
          this.setState({ errorText: 'An error occured.' });
        }
      },
      (error) => {
        console.log(error);
        this.setState({ errorText: 'An error occured.' });
      }
    )
    this.setState({ loading: false });
  } 
  
  render() {
    const loader = <div className="loader">Loading...</div>;
    return (
      <ReactModal 
      isOpen={this.props.showModal}
      overlayClassName="modal-overlay"
      className={"modal" + (this.state.submitted ? " confirm" : "")}
      closeTimeoutMS={200}
      shouldCloseOnOverlayClick={false}>
        <div className="modal-header">
          <span className="modal-title">Login</span>
          {/*<i class="modal-close material-icons">close</i>*/}
        </div>
        <div className="modal-body">
          <TextField label="Enter a nickname..." value={this.state.value} handleChange={this.handleChange} errorText={this.state.errorText}/>
        </div>
        <div className="modal-footer">
          <button onClick={this.submit} className={"modal-button-primary" + (this.state.enabled ? '' : ' disabled')}>{this.state.loading ? loader : "Submit"}</button>
        </div>
      </ReactModal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);