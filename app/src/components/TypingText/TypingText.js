import React from 'react';
import { connect } from 'react-redux'
import './TypingText.css';

const mapStateToProps = (state, ownProps) => {
    return {
        typing_users: state.room.typing_users
    }
}

export const TypingText = ({typing_users}) => {
    let users = '';
    let suffix = '';
    switch (typing_users.length) {
        case 1:
            users = <b>{typing_users[0].name}</b>;
            suffix = ' is typing a message...';
            break;
        case 2:
            users = [<b>{typing_users[0].name}</b>, ' and ', <b>{typing_users[1].name}</b>];
            suffix = ' are typing a message...';
            break;
        case 3:
            users = [<b>{typing_users[0].name}</b>, ', ', <b>{typing_users[1].name}</b>, ' and ', <b>{typing_users[2].name}</b>];
            suffix = ' are typing a message...';
            break;
    }

    return (
        <div className={"TypingText " + (typing_users.length ? 'visible' : '')}>
            <span className="typing-message">{typing_users.length > 3 ? "Several users are typing..." : users}{typing_users.length <= 3 && suffix}</span>
        </div>
    );
}

export default connect(mapStateToProps)(TypingText);