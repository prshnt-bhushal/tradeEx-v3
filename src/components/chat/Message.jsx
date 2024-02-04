import React from 'react';
import logo from '../../assets/img/logo.png';

function Message() {
  return (
    <div className="message owner">
      <div className="messageInfo">
        <img src={logo} alt="userProfile" />
        <div className="messageTimestamp">11:00</div>
      </div>
      <div className="messageContent">
        <p className="messageText">Hello</p>
        <img src={logo} alt="sendImage" />
      </div>
    </div>
  );
}

export default Message;
