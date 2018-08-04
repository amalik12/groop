import React from 'react';
import './ReplyInput.css';
import Button from '../Button';

let ReplyInput = (props) => {
    return (
        <div className="ReplyInput">
            <input className="user-input reply-input-inner" placeholder="Write a reply..."></input>
            <Button label="Cancel" buttonStyle="text" onClick={props.toggleReply}/>
        </div>
    );
}

export default ReplyInput;