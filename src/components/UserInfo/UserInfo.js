import React from 'react';
import Modal from '../Modal';
import { connect } from 'react-redux'
import Avatar from '../Avatar';
import './UserInfo.css';
let UserInfo = (props) => {
    return (
        <div className="user-info">
            <Avatar />
            <div className="user-info-name">{props.user.name}</div>
        </div>
    );
}

export default UserInfo;