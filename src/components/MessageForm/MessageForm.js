import React, {Component} from 'react';
import './style.css';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: ''
    }

    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }

  handleChange(event) {
    this.setState({newMessage: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {newMessage} = this.state;
    if (newMessage !== '') {
      this
        .props
        .onSubmitMessageForm(this.state.newMessage);
      this.setState({newMessage: ''});
    }
  }

  render() {
    const {newMessage} = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={newMessage}
          className="MessageInput"
          onChange={this.handleChange}
          placeholder="Message"/>
      </form>
    )
  }
}

export default MessageForm;