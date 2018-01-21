import React from 'react';
import { connect } from 'react-redux'
import './Members.css';
import Avatar from '../Avatar';

const mapStateToProps = (state, ownProps) => {
  return {
    current_users: state.room.current_users
  }
}

let Members = ({current_users}) => {
  let preview = current_users.slice(0, 3);
  return (
    <div className="Members">
    <span className="member-count">{current_users.length} {current_users.length === 1 ? 'member' : 'members'}</span>
    {preview.map((item) => { return <Avatar /> })}
    </div>
  );
}

Members = connect(mapStateToProps)(Members)

export default Members;
