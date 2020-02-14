import React, {Component} from 'react';

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
            <div>
                <p onClick={this.playAudio.bind(this)}>PLAY</p>
            </div>
        )
    }
}

export default ChatMessage;
