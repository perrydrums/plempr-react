import React, {Component} from 'react';
import {withFirebase} from '../Firebase';
import ChatMessage from './ChatMessage';

class ChatContainer extends Component {

    render() {
        return (
            <div>
                <ChatMessage message={'hello'} />
                <ChatMessage message={'lala'} />
            </div>
        )
    }
}

export default withFirebase(ChatContainer);
