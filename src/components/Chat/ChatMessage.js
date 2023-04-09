import React, { Component } from 'react';
import {
  Message, MessageArrow, MessageButton, MessageUsername,
} from './styled';

class ChatMessage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDeleteButton: false,
    };
  }

  iOS() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
  }

  canPlay() {
    const { audioFiles } = this.props;
    const onIOS = this.iOS();
    return audioFiles.every((audioFile) => !audioFile.includes('.ogg')) || !onIOS;
  }

  // Play the audio files in sequence.
  playAudio() {
    const { audioFiles, audioElement } = this.props;

    let index = 0;

    audioElement.src = audioFiles[index];
    audioElement.play();

    index++;

    audioElement.onended = () => {
      if (index < audioFiles.length) {
        audioElement.src = audioFiles[index];
        audioElement.play();
        index++;
      } else {
        index = 0;
      }
    };
  }

  render() {
    return (
      <Message createdByCurrentUser={this.props.createdByCurrentUser}
               onMouseOver={() => this.setState({ showDeleteButton: true })}
               onMouseLeave={() => this.setState({ showDeleteButton: false })}
      >
        <MessageUsername>
          [{this.props.langcode}]&nbsp;
          <strong>{this.props.createdByName}</strong>
          {' '}
          zegt<br/>
          <span style={{ color: '#909090', fontSize: '.75em'}}>
            {new Date(this.props.createdOn).toLocaleDateString()} om {new Date(this.props.createdOn).toLocaleTimeString()}
          </span>
        {/* if hovering over message show delete button */}
        {this.state.showDeleteButton && this.props.createdByCurrentUser && (
          <>
            <br/>
            <span
              style={{ fontSize: '.75em', color: 'red', cursor: 'pointer' }}
              onClick={this.props.deleteMessage}
            >
              Verwijder
            </span>
          </>
        )}

        </MessageUsername>
        <MessageButton createdByCurrentUser={this.props.createdByCurrentUser}>
          <MessageArrow
            onClick={this.playAudio.bind(this)}
            style={{ borderLeftColor: this.canPlay() ? 'dodgerblue' : 'red' }}
          />
        </MessageButton>
      </Message>
    );
  }
}

export default ChatMessage;
