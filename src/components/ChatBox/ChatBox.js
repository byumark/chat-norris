import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';
import './style.css';

import Message from '../Message/Message'
import MessageForm from '../MessageForm/MessageForm'

class ChatBox extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
    this.handleOnSubmitMessageForm = this
      .handleOnSubmitMessageForm
      .bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:8887/messagesArchived').then(res => res.ok
      ? res.json() : console.log('bad'))
    .then(json => this.setState({
      messages: json
    }, () => {
      this.messagesDiv = document.getElementById("messages");
      this.updateScroll();
      setInterval(() => {
        this.getNewMessages();
      }, 3000)
    }));
  }

  getNewMessages() {
    const {messages} = this.state;
    const doScroll = this.isScrollAtEnd()
    fetch('http://localhost:8887/newMessages').then(res => res.ok
      ? res.json()
      : console.log('bad')).then(newMessages => {
      if (newMessages.length > 0) {
        this.setState({
          messages: [
            ...messages,
            ...newMessages
          ]
        }, () => doScroll
          ? this.updateScroll()
          : undefined);
      }
    })
  }

  handleOnSubmitMessageForm(newMessage) {
    const now = new Date();
    const newChatMessage = {
      personName: "Me",
      dateCreated: now.toString(),
      chatMessage: newMessage
    }
    this.setState({
      messages: [
        ...this.state.messages,
        newChatMessage
      ]
    }, () => this.updateScroll());
  }

  isScrollAtEnd() {
    return this.messagesDiv !== undefined
      ? this.messagesDiv.scrollHeight - this.messagesDiv.scrollTop === this.messagesDiv.clientHeight
      : false
  }

  updateScroll() {
    this.messagesDiv.scrollTop = this.messagesDiv.scrollHeight;
  }

  render() {
    const {messages} = this.state;
    return <div className="ChatBox">
      <Grid id="messages" className="Messages">
        {messages.map((message, i) => {
          return <Message key={i} {...message}/>
        })}
      </Grid>
      <MessageForm
        className="MessageForm"
        onSubmitMessageForm={(newMessage) => this.handleOnSubmitMessageForm(newMessage)}/>
    </div>
  }
}

export default ChatBox;