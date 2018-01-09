import React from 'react';
import { connect } from 'react-redux'
import './Members.css';
import Avatar from '../Avatar';

const mapStateToProps = (state, ownProps) => {
  return {
    num_users: state.num_users
  }
}

let Members = ({num_users}) => {
    return (
      <div className="Members">
      	<span className="member-count">{num_users} {num_users === 1 ? 'member' : 'members'}</span>
      	<Avatar />
      	<Avatar />
      	<Avatar />
      </div>
    );
}

Members = connect(mapStateToProps)(Members)

export default Members;
