import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import ChatMessage from './ChatMessage';
import { ChatWrapper } from './styled';

class ChatContainer extends Component {
  state = {
    messages: [],
    messagesEnd: null,
  };

  constructor(props) {
    super(props);

    const db = props.firebase.getFirestore();

    // Set a listener for new messages.
    db.collection('messages').orderBy('createdOn').onSnapshot((snapshot) => {
      const messages = [];
      snapshot.forEach((doc) => {
        messages.push({
          id: doc.id,
          message: doc.get('message'),
          audioFiles: doc.get('audio'),
          langcode: doc.get('langcode') || 'nl',
          createdBy: doc.get('createdBy'),
          createdByName: doc.get('createdByName'),
          createdOn: doc.get('createdOn'),
        });
      });

      this.setState({ messages });
    });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  deleteMessage = (messageId) => {
    const db = this.props.firebase.getFirestore();
    db.collection('messages').doc(messageId).delete();
  }

  render() {
    const audioElement = new Audio();

    const messages = this.state.messages.map((message) => (
      <ChatMessage
        key={message.id}
        message={message.message}
        audioFiles={message.audioFiles}
        langcode={message.langcode}
        createdBy={message.createdBy}
        createdByName={message.createdByName}
        createdOn={message.createdOn}
        createdByCurrentUser={this.props.uid === message.createdBy}
        audioElement={audioElement}
        deleteMessage={() => this.deleteMessage(message.id)}
      />
    ));

    return (
      <ChatWrapper>
        {messages}
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={(e) => this.messagesEnd = e}
        />
      </ChatWrapper>
    );
  }
}

export default withFirebase(ChatContainer);
