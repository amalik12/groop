import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import './Input.css';

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
	}

	componentDidMount() {
		this.height = this.textInput.style.height;
	}

	handleKeyPress(event) {
		if(event.key === 'Enter'){
			event.preventDefault();
			if (!event.target.value.trim()) {
				return
			}
			var myHeaders = new Headers();
			myHeaders.append("Authorization", localStorage.getItem('token'));
			myHeaders.append("Content-Type", "application/json");
			fetch("/api/v1/rooms/" + this.props.room_id + "/messages", { method: 'POST', body: JSON.stringify({ message: event.target.value }), headers: myHeaders })
			.then((result) => {},
			(error) => {
				console.log(error);
				// TODO: alert user
			})
			event.target.value = '';
  		}
	}

	handleChange(event) {
		$(this.textInput).outerHeight(this.height).outerHeight(this.textInput.scrollHeight);
	}

	render() {
		return (
			<div className="Input">
				<textarea className="input-inner" ref={(input) => { this.textInput = input; }} onKeyPress={this.handleKeyPress} onChange={this.handleChange} placeholder="Type a message...">
				</textarea>
			</div>
		);
	}
}

export default connect(mapStateToProps)(Input);