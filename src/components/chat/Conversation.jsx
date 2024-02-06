import React, { useContext, useEffect, useState } from 'react';
import Message from './Message';
import { ChatContext } from '../../contexts/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

function Conversation() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => unsubscribe();
  }, [data.chatId]);

  return (
    <div className="conversation">
      {messages?.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}

export default Conversation;
