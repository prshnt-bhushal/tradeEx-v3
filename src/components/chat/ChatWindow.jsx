import React, { useContext } from 'react';
import SendMessage from './SendMessage';
import Conversation from './Conversation';
import { ChatContext } from '../../contexts/ChatContext';

function ChatWindow() {
  const { data } = useContext(ChatContext);

  return (
    <div className="chatWindow">
      <div className="messageTitle">{data.user?.displayName}</div>
      <Conversation />
      <SendMessage />
    </div>
  );
}

export default ChatWindow;
