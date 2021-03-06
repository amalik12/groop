import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkUsername } from '../../actions';
import TextField from '../TextField';
import FormModal from '../FormModal';

const mapStateToProps = (state, ownProps) => {
    return {
        room_id: state.room.shortid
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        checkUsername: (username) => dispatch(checkUsername(username))
    }
}

export class RegisterModal extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', confirm: '', passwordError: '',
        usernameValid: false, passwordValid: false, loading: false };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.checkUsername = this.checkUsername.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.submit = this.submit.bind(this);
        this.usernameTimer = undefined;
    }
    
    handleUsernameChange(event) {
        clearTimeout(this.usernameTimer);
        this.setState({ username: event.target.value, usernameValid: false });
        this.props.clearLoginError();
        this.usernameTimer = setTimeout(this.checkUsername, 700);
    }
    
    handlePasswordChange(event) {
        if (event.target.name === "Confirm password") {
            this.setState({ passwordError: '', confirm: event.target.value }, () => this.checkPassword());
        } else {
            this.setState({ passwordError: '', password: event.target.value }, () => this.checkPassword());
        }
    }
    
    checkUsername() {
        if (this.state.username) {
            this.setState({ loading: true });
            this.props.checkUsername(this.state.username)
            .then((result) => {
                this.setState({ loading: false, usernameValid: true });
            },
            (error) => {
                this.setState({ loading: false, usernameValid: false });
            })
        }
    }
    
    checkPassword() {
        if (this.state.password !== '' && (this.state.password === this.state.confirm)) {
            this.setState({ passwordError: '', passwordValid: true });
        } else {
            this.setState({ passwordValid: false });
            if (this.state.password !== '' && this.state.confirm !== '') {
                this.setState({ passwordError: 'Passwords do not match' });
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
            <FormModal title="Register" showModal={this.props.showModal}
            submit={this.submit} loading={this.state.loading} enabled={this.state.usernameValid && this.state.passwordValid}>
                <TextField label="Username" value={this.state.username} handleChange={this.handleUsernameChange}
                errorText={this.props.error} />
                <TextField label="Password" password={true} value={this.state.password} handleChange={this.handlePasswordChange}
                errorText={this.state.passwordError} />
                <TextField label="Confirm password" password={true} value={this.state.confirm} handleChange={this.handlePasswordChange} />
                Already have an account? <span className="link" onClick={this.props.switch}>Login</span>
            </FormModal>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);