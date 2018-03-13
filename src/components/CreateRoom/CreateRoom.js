import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CreateRoomForm from './CreateRoomForm';
import SigninModal from '../SigninModal';
import { createRoom, setNameError, setShortidError, checkShortid } from '../../actions';

export const NAME_LABEL = "Your room name";
export const SHORTID_LABEL = "<random url>";

const mapStateToProps = (state, ownProps) => {
    return {...state.create_room, new_shortid: state.room.shortid }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createRoom: (name, shortid) => dispatch(createRoom(name, shortid)),
        checkShortid: (shortid) => dispatch(checkShortid(shortid)),
        setNameError: (text) => dispatch(setNameError(text)),
        setShortidError: (text) => dispatch(setShortidError(text))
    }
}

class CreateRoom extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', shortid: '', enabled: true };
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.checkShortid = this.checkShortid.bind(this);
        this.shortidTimer = undefined;
    }

    handleChange(event) {
        clearTimeout(this.shortidTimer);
        if (event.target.name === NAME_LABEL) {
            this.setState({ name: event.target.value.toLowerCase() });
            this.props.setNameError('');
        } else {
            this.setState({ shortid: event.target.value.toLowerCase() });
            this.shortidTimer = setTimeout(this.checkShortid, 700);
        }
    }

    checkShortid() {
        if (this.state.shortid !== this.state.shortid.replace(/[^a-zA-Z0-9-_]/g, '')) {
            this.props.setShortidError('URL contains invalid characters');
        } else {
            this.props.setShortidError('')
            
            if (this.state.shortid) this.props.checkShortid(this.state.shortid).catch((error) => console.error(error));
        }  
    }

    submit() {
        if (this.state.name) {
            this.props.createRoom(this.state.name, this.state.shortid)
        } else {
            this.props.setNameError('Room name is empty');
        }
    }

    render() {
        return (
            <div>
                <SigninModal socket={this.props.socket} />
                <CreateRoomForm name={this.state.name} shortid={this.state.shortid} loading={this.props.loading} handleChange={this.handleChange}
                    handleKeyPress={this.handleKeyPress} submit={this.submit} enabled={this.state.name && !this.props.name_error && !this.props.shortid_error} name_error={this.props.name_error} shortid_error={this.props.shortid_error} />
                {this.props.done && <Redirect push to={"/" + this.props.new_shortid} />}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom);