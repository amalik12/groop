import React from 'react';
import { connect } from 'react-redux'
import './Header.css';
import Members from '../Members';
import Timestamp from '../Timestamp';

const mapStateToProps = (state, ownProps) => {
  return {
    room: state.room
  }
}

export const Header = ({room}) => {
    return (
      <div className="Header">
      	<div className='room-info'>
	      	<span className="room-name">{room.name}</span>
	      	<span className="creation-time">Created <Timestamp time={room.creation_time} /></span>
      	</div>
      	<Members/>
      </div>
    );
}

export default connect(mapStateToProps)(Header);
