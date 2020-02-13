import React from 'react';

const ChatMessage = props => {
    const {message, audio} = props;

    return (
        <div>
            <p>{message}</p>
        </div>
    )
};

export default ChatMessage;
