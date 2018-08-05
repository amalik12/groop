import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ReplyInput.css';
import Button from '../Button';

const mapStateToProps = (state, ownProps) => {
    return {
        room_id: state.room.shortid
    }
}

class ReplyInput extends Component {
    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        this.lastTyping = 0;
        this.typeInterval = 4000;
    }

    handleKeyPress(event) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token'));
        myHeaders.append("Content-Type", "application/json");
        if (event.key === 'Enter') {
            event.preventDefault();
            if (!event.target.value.trim()) {
                return
            }
            fetch("/api/v1/rooms/" + this.props.room_id + "/messages", { method: 'POST', body: JSON.stringify({ message: event.target.value, quote: this.props.id }), headers: myHeaders })
            .catch((error) => {
                console.log(error);
                // TODO: alert user
            });
            event.target.value = '';
            this.props.toggleReply();
        } else if (Date.now() - this.lastTyping > this.typeInterval) {
            this.lastTyping = Date.now();
            fetch("/api/v1/rooms/" + this.props.room_id + "/typing", { method: 'POST', headers: myHeaders })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    render() {
        return (
            <div className="ReplyInput">
                <input className="user-input reply-input-inner" placeholder="Write a reply..." onKeyPress={this.handleKeyPress}></input>
                <Button label="Cancel" buttonStyle="text" onClick={this.props.toggleReply}/>
            </div>
        );
    }
}

export default connect(mapStateToProps)(ReplyInput);