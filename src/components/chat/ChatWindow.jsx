import React from 'react';
import SendMessage from './SendMessage';
import Conversation from './Conversation';

function ChatWindow() {
  return (
    <div className="chatWindow">
      <div className="messageTitle">Jane</div>
      <Conversation />
      <SendMessage />
    </div>
  );
}

export default ChatWindow;
