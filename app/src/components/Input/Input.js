import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import './Input.css';
import TypingText from '../TypingText';

const mapStateToProps = (state, ownProps) => {
	return {
		room_id: state.room.shortid
	}
}

export class Input extends Component {
	constructor(props) {
	    super(props);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.textInput = {style: {}}
	}

	componentDidMount() {
		this.height = this.textInput.style.height;
		this.lastTyping = 0;
		this.typeInterval = 4000;
	}

	handleKeyPress(event) {
		var myHeaders = new Headers();
		myHeaders.append("Authorization", localStorage.getItem('token'));
		myHeaders.append("Content-Type", "application/json");
		if(event.key === 'Enter') {
			event.preventDefault();
			if (event.shiftKey) {
				event.target.value += '\n';
				$(this.textInput).outerHeight(this.height).outerHeight(this.textInput.scrollHeight);
				return
			}
			if (!event.target.value.trim()) {
				return
			}
			fetch("/api/v1/rooms/" + this.props.room_id + "/messages", { method: 'POST', body: JSON.stringify({ message: event.target.value }), headers: myHeaders })
			.then((result) => {},
			(error) => {
				console.log(error);
				// TODO: alert user
			});
			event.target.value = '';
			$(this.textInput).outerHeight(this.height).outerHeight(this.textInput.scrollHeight);
		} else if (Date.now() - this.lastTyping > this.typeInterval) {
			this.lastTyping = Date.now();
			fetch("/api/v1/rooms/" + this.props.room_id + "/typing", { method: 'POST', headers: myHeaders })
			.catch((error) => {
				console.log(error);
			});
		}
	}

	handleChange(event) {
		$(this.textInput).outerHeight(this.height).outerHeight(this.textInput.scrollHeight);
	}

	render() {
		return (
			<div className="Input">
				<TypingText />
				<div className="input-inner">
					<textarea className="user-input input-textarea" ref={(input) => { this.textInput = input; }} onKeyPress={this.handleKeyPress} onChange={this.handleChange} placeholder="Type a message...">
					</textarea>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps)(Input);