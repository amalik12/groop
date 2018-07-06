import React from 'react';
import { connect } from 'react-redux'
import './TypingText.css';

const mapStateToProps = (state, ownProps) => {
    return {
        typing_users: state.room.typing_users,
        current_user: state.login.user
    }
}

export const TypingText = ({typing_users, current_user}) => {
    let typing_list = typing_users.filter((user) => user._id !== current_user._id);
    let users = '';
    let suffix = '';
    switch (typing_list.length) {
        case 1:
            users = <b>{typing_list[0].name}</b>;
            suffix = ' is typing a message...';
            break;
        case 2:
            users = [<b>{typing_list[0].name}</b>, ' and ', <b>{typing_list[1].name}</b>];
            suffix = ' are typing a message...';
            break;
        case 3:
            users = [<b>{typing_list[0].name}</b>, ', ', <b>{typing_list[1].name}</b>, ' and ', <b>{typing_list[2].name}</b>];
            suffix = ' are typing a message...';
            break;
        default:
            break;
    }

    return (
        <div className={"TypingText " + (typing_list.length ? 'visible' : '')}>
            <span className="typing-message">{typing_list.length > 3 ? "Several users are typing..." : users}{typing_list.length <= 3 && suffix}</span>
        </div>
    );
}

export default connect(mapStateToProps)(TypingText);