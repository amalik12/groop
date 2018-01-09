import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions';
import ReactModal from 'react-modal';
import TextField from '../TextField';
import '../Modal/Modal.css';

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
    this.setState({value: event.target.value, errorText: '', enabled: false, loading: true});
    this.timer = setTimeout(this.checkUsername, 700);
  }

  checkUsername() {
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
    this.setState({submitted: true, showModal: false});
  }


  render() {
    const loader = <div className="loader">Loading...</div>;
    return (
      <ReactModal 
      isOpen={this.state.showModal}
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

export default LoginModal;