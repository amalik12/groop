import React from 'react';
import { connect } from 'react-redux'
import './Members.css';
import Avatar from '../Avatar';
import { members } from '../../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    current_users: state.room.current_users
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showModal: () => dispatch(members())
  }
}

export const Members = ({current_users, showModal}) => {
  let preview = current_users.slice(0, 3);
  return (
    <div className="Members" onClick={showModal}>
      <span className="member-count">{current_users.length} {current_users.length === 1 ? 'member' : 'members'}</span>
      {preview.map((item) => <Avatar key={item._id} user={item}/>)}
      {current_users.length > 3 && <div className="member-more">{'+' + (current_users.length - 3)}</div>}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Members);