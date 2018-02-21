import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Input.css';

const mapStateToProps = (state, ownProps) => {
	return {
		room_id: state.room._id
	}
}

export class Input extends Component {
	constructor(props) {
	    super(props);
	    this.handleKeyPress = this.handleKeyPress.bind(this);
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
			fetch("/api/v1/room/" + this.props.room_id + "/messages", { method: 'POST', body: JSON.stringify({ message: event.target.value }), headers: myHeaders })
				.then((result) => {},
				(error) => {
					console.log(error);
					// TODO: alert user
				}
			)
			event.target.value = '';
  		}
	}

	render() {
		return (
			<textarea onKeyPress={this.handleKeyPress} placeholder="Type a message..." className="Input">
			</textarea>
		);
	}
}

export default connect(mapStateToProps)(Input);