import React, { Component } from 'react';
import './Input.css';

class Input extends Component {
	constructor(props) {
	    super(props);
	    this.handleKeyPress = this.handleKeyPress.bind(this);
	 }

	handleKeyPress(event) {
		if(event.key === 'Enter'){
			event.preventDefault()
			if (!event.target.value.trim()) {
				return
			}
			let message = event.target.value
			this.props.socket.emit('message', message);
			event.target.value = ''
  		}
	}

	render() {
		return (
			<textarea onKeyPress={this.handleKeyPress} placeholder="Type a message..." className="Input">
			</textarea>
		);
	}
}

export default Input;
