import React, {Component} from 'react';
import {Message, MessageArrow, MessageButton, MessageUsername} from './styled';

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
                <MessageUsername>
                    {this.props.createdByName}
                </MessageUsername>
                <MessageButton createdByCurrentUser={this.props.createdByCurrentUser}>
                    <MessageArrow onClick={this.playAudio.bind(this)} />
                </MessageButton>
            </Message>
        )
    }
}

export default ChatMessage;
