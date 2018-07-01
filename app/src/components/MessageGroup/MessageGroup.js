import React from 'react';
import '../Message/Message.css';
import Message from '../Message';

let MessageGroup = (props) => {
    return (
        <div className="MessageGroup">
            {props.messages.map((message, index) => {
                if (index === 0) {
                    return <Message simple={false} {...message} />
                }
                return <Message simple={true} {...message} />
            })}
        </div>
    );
}

export default MessageGroup;