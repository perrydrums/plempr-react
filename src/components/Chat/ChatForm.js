import React, {Component} from 'react';
import {withFirebase} from '../Firebase';
import {ChatFormInput} from './styled';

class ChatFormBase extends Component {
  fetchParams = {
    headers: {
      Accept: 'application/json',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      message: [],
      words: [],
      valid: false,
      langcode: 'nl',
    };
  }

  // Check if audio of the word exists in the API.
  checkWords = async () => {
    let words = [];

    for (const word of this.state.words) {
      if (!word.valid) {
        // Check if the word exists in the API.
        try {
          const url = `https://${this.state.langcode}.wiktionary.org/api/rest_v1/page/media-list/${word.word}`;

          const response = await fetch(url, this.fetchParams);
          const json = await response.json();

          if (json.items) {
            for (const mediaFile of json.items) {
              if (mediaFile.type === 'audio') {
                const fileUri = mediaFile.title;
                const fileName = fileUri.split(':')[1];
                word.audio = `https://${this.state.langcode}.wiktionary.org/wiki/Special:FilePath/${fileName}`;
                word.valid = true;
                break;
              }
            }
          }
        } catch (e) {}
      }
      words.push(word);
    }

    // Check if all words are valid.
    const valid = words.every((word) => word.valid);
    this.setState({ words, valid });
  };

  // Runs on input change.
  onChange = (event) => {
    this.setState({ input: event.target.value });
  };

  postMessage = async (event) => {
    event.preventDefault();

    const audioFiles = [];

    for (const word of this.state.words) {
      audioFiles.push(word.audio);
    }

    const { uid } = this.props.firebase.auth.currentUser;

    let messageString = '';
    this.state.words.forEach((w) => {
      messageString += `${w.word} `;
    });

    await this.props.firebase.doCreateMessage(uid, messageString, audioFiles, this.state.langcode);

    this.setState({ words: [] });
    this.inputRef.value = '';
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.input !== prevState.input) {
      // Clear the timeout.
      clearTimeout(this.state.timeOutId || 0);

      // Get all words, separated by spaces.
      const words = this.state.input.split(' ').map((word) => ({
        word,
        audio: null,
        valid: false,
      }));

      this.setState({ words });
      const timeOutId = setTimeout(this.checkWords, 500);
      this.setState({ timeOutId });
    }
  }

  render() {
    // Invalid words are red.
    const preview = this.state.words.map((word) => {
      if ('valid' in word) {
        return <span style={{ color: word.valid ? 'green' : 'red' }}>{word.word} </span>;
      }
      return '';
    });

    return (
      <form>
        <ChatFormInput
          type="text"
          placeholder="typ een woord"
          name="message"
          onChange={this.onChange}
          ref={(inputRef) => { this.inputRef = inputRef; }}
        />
        <div>{preview}</div>
        <button
          disabled={!this.state.valid}
          onClick={this.postMessage}
        >
          verstuur
        </button>
        <select onChange={(e) => this.setState({ langcode: e.target.value })}>
          <option value="nl">Nederlands</option>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </form>
    );
  }
}

const ChatForm = withFirebase(ChatFormBase);

export default ChatForm;
