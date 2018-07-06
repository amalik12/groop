import React from 'react';
import Modal from '../Modal';
import { connect } from 'react-redux';
import UserInfo from '../UserInfo';
import { members } from '../../actions';
import { Scrollbars } from 'react-custom-scrollbars';
import './MembersModal.css';

const mapStateToProps = (state, ownProps) => {
    return {
        showModal: state.modals.members,
        members: state.room.current_users.map(user => <UserInfo key={user._id} user={user} />)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dismiss: () => dispatch(members())
    }
}

export const MembersModal = (props) => {
    let users = [];
    for (let index = 0; index < 20; index++) {
        users.push({ name: 'Bob', avatar: 'default-3.png' })
    }
    return (
        <Modal showModal={props.showModal} dismissable={true} dismiss={props.dismiss} title="Members">
            <Scrollbars autoHeight={true} renderThumbVertical={props => <div {...props} className="thumb-vertical" />}>
                <div className="members-modal modal-body">
                    {props.members}
                </div>
            </Scrollbars>  
        </Modal>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MembersModal);