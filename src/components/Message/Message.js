import React from 'react';
import moment from 'moment';
import './style.css';

const Message = ({personName, dateCreated, chatMessage}) => (
  <div className="Message">
    <img 
        className="Avatar" 
        src={`/images/${personName.replace(/ /g, "_").replace(/-/g, "_")}.jpg`} 
        alt="" />
    <div className="MessageHeaderBodyContainer">
      <div className="MessageHeader">
        <span className="PersonName">{personName}</span>
        <span>&ensp;</span>
        <span className="DateCreated">{moment(new Date(dateCreated)).fromNow()}</span>
      </div>
      <div className="MessageBody">
        <p className="ChatMessage">{chatMessage}</p>
      </div>
    </div>
  </div>
)

export default Message;