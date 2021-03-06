import React, {Component} from 'react';
import easterEggs from '../../constants/easterEggs';
import {withFirebase} from '../Firebase';
import {ChatFormInput} from './styled';

class ChatFormBase extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: [],
            currentWord: '',
            checkWordInProgress: false,
            valid: false,
            wordInput: null,
        };
    }

    // Check if audio of the word exists in the API.
    checkWord = async word => {
        // Don't check empty words.
        if (!word || word === '') {
            return;
        }

        this.setState({ valid: false });

        // Set valid to TRUE immediately if it's one of the easter eggs.
        if (easterEggs.indexOf(word) !== -1) {
            this.setState({ valid: true });
            return;
        }

        // Check if the word exists in the API.
        try {
            const url = `https://nl.wiktionary.org/api/rest_v1/page/media/${word}`;
            const response = await fetch(url);
            const json = await response.json();

            if (Array.isArray(json.items)) {
                for (const item of json.items) {
                    if (item.type === 'audio') {
                        this.setState({ valid: true });
                        break;
                    }
                }
            }
        } catch (e) {
            this.setState({ valid: false });
        }

        this.setState({ checkWordInProgress: false });
    };

    // Runs on input change.
    onChange = event => {
        const word = event.target.value;

        this.setState({ currentWord: word });

        // Don't do multiple requests at the same time.
        if (this.state.checkWordInProgress) {
            return;
        }
        this.setState({ checkWordInProgress: true });

        setTimeout(() => this.checkWord(word), 500);
    };

    // Add word to the message.
    addWord = async event => {
        event.preventDefault();

        const word = this.state.currentWord;

        if (this.state.valid && word) {
            const url = `https://nl.wiktionary.org/api/rest_v1/page/media/${word}`;
            const response = await fetch(url);
            const json = await response.json();

            if (Array.isArray(json.items)) {
                for (const item of json.items) {
                    if (item.type === 'audio') {
                        this.state.message.push({
                            word,
                            audio: item.original.source,
                        });
                        break;
                    }
                }
            }

            this.setState({
                currentWord: '',
                checkWordInProgress: false,
                valid: false,
            });
        }

        this.wordInput.focus();
    };

    postMessage = async event => {
        event.preventDefault();

        let audioFiles = [];

        for (const word of this.state.message) {
            if (easterEggs.indexOf(word.word) !== -1) {
                audioFiles.push(`/audio/${word}.mp3`);
                continue;
            }

            audioFiles.push(word.audio);
        }

        const uid = this.props.firebase.auth.currentUser.uid;

        let messageString = '';
        this.state.message.forEach(w => {
            messageString += w.word + ' ';
        });

        await this.props.firebase.doCreateMessage(uid, messageString, audioFiles);

        this.setState({ message: []});
    };

    render() {
        const message = this.state.message.map(word => word.word + ' ');

        return (
            <form>
                <ChatFormInput
                    type="text"
                    placeholder="typ een woord"
                    name="message"
                    value={this.state.currentWord}
                    onChange={this.onChange}
                    ref={(input) => { this.wordInput = input; }}
                />
                <button
                    disabled={!this.state.valid}
                    onClick={this.addWord}
                >
                    voeg woord toe
                </button>

                <button
                    onClick={this.postMessage}
                >
                    verstuur
                </button>
                <div>{message}</div>
            </form>
        );
    }
}

const ChatForm = withFirebase(ChatFormBase);

export default ChatForm;
