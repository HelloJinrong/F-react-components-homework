import React, { Component } from 'react';
import './ChatInput.scss';
import answersData from '../../data/answers.json';
import { ROLE } from '../../constants';

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      role: '',
      tags: [],
    };
  }

  sendMessage = () => {
    this.updateText();
    if (this.state.text === '') {
      return;
    }

    const message = {
      ...this.state,
    };
    this.props.concatMessage(message);
    this.concatDefinedAnswer(message);
    this.clearInput();
    this.clearState();
  };

  updateText = () => {
    const text = document.getElementById('messageText').value;
    const role = ROLE.CUSTOMER;
    this.setState({ text, role });
  };

  concatDefinedAnswer = (message) => {
    answersData.forEach((answer) => {
      answer.tags.forEach((tag) => {
        if (message.text.includes(tag)) {
          this.props.concatMessage(answer);
        }
      });
    });
  };

  hasPressedEnter = (event) => {
    if (event.keyCode === 13) {
      return true;
    }
    return false;
  };

  clearInput = () => {
    document.getElementById('messageText').value = '';
  };

  clearState = () => {
    const state = {
      text: '',
      role: '',
      tags: [],
    };
    this.setState({ ...state });
  };

  render() {
    return (
      <footer className="ChatInput">
        <input
          type="text"
          onChange={this.updateText}
          onKeyUp={(event) => this.hasPressedEnter(event) && this.sendMessage()}
          id="messageText"
        />
        <button type="button" onClick={this.sendMessage}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
