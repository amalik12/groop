import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Header.css';
import Members from '../Members';
import Timestamp from '../Timestamp';

const mapStateToProps = (state, ownProps) => {
  return {
    room: state.room
  }
}

class Header extends Component {
  render() {
    return (
      <div className="Header">
      	<div className='room-info'>
	      	<span className="room-name">{this.props.room.name}</span>
	      	<span className="creation-time">Created <Timestamp time={this.props.room.creation_time} /></span>
      	</div>
      	<Members />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Header);
