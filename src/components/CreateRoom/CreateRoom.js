import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CreateRoomForm from './CreateRoomForm';
import SigninModal from '../SigninModal';
import { createRoom } from '../../actions';

const mapStateToProps = (state, ownProps) => {
    return {...state.create_room, new_shortid: state.room.shortid }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createRoom: (name, shortid) => dispatch(createRoom(name, shortid))
    }
}

class CreateRoom extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', shortid: ''};
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(event) {
        if (event.target.name === "Your room name") {
            this.setState({ name: event.target.value });
        } else {
            this.setState({ shortid: event.target.value });
        }
    }

    submit() {
        this.props.createRoom(this.state.name, this.state.shortid)
    }

    render() {
        return (
            <div>
                <SigninModal socket={this.props.socket} />
                <CreateRoomForm name={this.state.name} shortid={this.state.shortid} loading={this.props.loading} handleChange={this.handleChange}
                handleKeyPress={this.handleKeyPress} submit={this.submit} error={this.props.error} />
                {this.props.done && <Redirect push to={"/" + this.props.new_shortid} />}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom);