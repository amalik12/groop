import React from 'react';
import Message from '../Message';

let MessageGroup = (props) => {
    return (
        <div className="MessageGroup">
            {props.messages.map((message, index) => {
                if (index === 0) {
                    return <Message simple={false} key={message._id} {...message} />
                }
                return <Message simple={true} key={message._id} {...message} />
            })}
        </div>
    );
}

export default MessageGroup;