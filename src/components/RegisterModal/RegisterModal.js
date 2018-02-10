import React, { Component } from 'react';
import TextField from '../TextField';
import FormModal from '../FormModal';

class RegisterModal extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', confirm: '', passwordError: '', enabled: false, loading: false };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.checkUsername = this.checkUsername.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.submit = this.submit.bind(this);
        var usernameTimer;
        var passwordTimer;
    }
    
    handleUsernameChange(event) {
        clearTimeout(this.usernameTimer);
        this.setState({ username: event.target.value, enabled: false });
        this.props.setError('');
        this.usernameTimer = setTimeout(this.checkUsername, 700);
    }
    
    handlePasswordChange(event) {
        clearTimeout(this.passwordTimer);
        if (event.target.name === "Confirm password") {
            this.setState({ confirm: event.target.value, passwordError: '', enabled: false });
        } else {
            this.setState({ password: event.target.value });
        }
        this.passwordTimer = setTimeout(this.checkPassword, 700);
    }
    
    checkUsername() {
        if (this.state.username) {
            this.setState({ loading: true });
            fetch("/api/v1/users?name=" + this.state.username, { method: 'HEAD' })
            .then(
                (result) => {
                    if (result.status === 200) {
                        this.props.setError('Username already taken');
                    } else if (this.state.password && this.state.confirm) {
                        this.setState({enabled: true});
                    }
                    this.setState({ loading: false });
                },
                (error) => {
                    console.log(error);
                    this.setState({ loading: false });
                }
            )
        }
    }
    
    checkPassword() {
        this.setState({ loading: true });
        if (this.state.password && this.state.confirm && !this.props.error) {
            if (this.state.password === this.state.confirm) {
                this.setState({ enabled: true });
            } else {
                this.setState({ enabled: false, passwordError: 'Passwords do not match' });
            }
        }
        this.setState({ loading: false });
    }
    
    submit() {
        this.setState({ loading: true });
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch("/register", { method: 'POST', body: JSON.stringify({ name: this.state.username, password: this.state.password }), headers: myHeaders })
        .then((result) => {
            return result.json()
        })
        .then(result => this.props.signin(result))
        .then((result) => {
            this.setState({ loading: false });
        })
    }
    
    render() {
        return (
            <FormModal title="Register" showModal={this.props.showModal} submitted={this.props.submitted} submit={this.submit} loading={this.state.loading} enabled={this.state.enabled}>
                <TextField label="Username" value={this.state.username} handleChange={this.handleUsernameChange} errorText={this.props.error} />
                <TextField label="Password" password={true} value={this.state.password} handleChange={this.handlePasswordChange} errorText={this.state.passwordError} />
                <TextField label="Confirm password" password={true} value={this.state.confirm} handleChange={this.handlePasswordChange} />
                Already have an account? <span className="link" onClick={this.props.switch}>Login</span>
            </FormModal>
        );
    }
}

export default RegisterModal;