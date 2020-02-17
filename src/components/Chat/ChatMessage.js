import React, {Component} from 'react';
import {Message, MessageButton} from './styled';

class ChatMessage extends Component {

    // Play the audio files in sequence.
    playAudio() {
        const {audioFiles, audioElement} = this.props;

        let index = 0;

        audioElement.src = audioFiles[index];
        audioElement.play();

        index ++;

        audioElement.onended = () => {
            if (index < audioFiles.length){
                audioElement.src = audioFiles[index];
                audioElement.play();
                index ++;
            } else {
                index = 0;
            }
        };
    };

    render() {
        return (
            <Message createdByCurrentUser={this.props.createdByCurrentUser}>
                <MessageButton onClick={this.playAudio.bind(this)} />
            </Message>
        )
    }
}

export default ChatMessage;
