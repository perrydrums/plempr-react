import React, {Component} from 'react';
import {withFirebase} from '../Firebase';
import ChatMessage from './ChatMessage';

class ChatContainer extends Component {

    state = {
        messages: [],
    };

    constructor(props) {
        super(props);

        const db = props.firebase.getFirestore();

        // Set a listener for new messages.
        db.collection('messages').orderBy('createdOn').onSnapshot(snapshot => {
            let messages = [];
            snapshot.forEach(doc => {
                messages.push({
                    id: doc.id,
                    message: doc.get('message'),
                    audioFiles: doc.get('audio'),
                    createdBy: doc.get('createdBy'),
                    createdOn: doc.get('createdOn'),
                })
            });

            this.setState({ messages });
        });
    }

    render() {
        const audioElement = new Audio();

        const messages = this.state.messages.map(message =>
            <ChatMessage
                key={message.id}
                message={message.message}
                audioFiles={message.audioFiles}
                createdBy={message.createdBy}
                createdOn={message.createdOn}
                audioElement={audioElement}
            />
            );

        return (
            <div>
                {messages}
            </div>
        )
    }
}

export default withFirebase(ChatContainer);
