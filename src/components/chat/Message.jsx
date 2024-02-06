import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { ChatContext } from '../../contexts/ChatContext';

function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }, [message]);
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && 'owner'}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="userProfile"
        />
        <div className="messageTimestamp">11:00</div>
      </div>
      <div className="messageContent">
        <p className="messageText">{message.text}</p>
        {message.image && <img src={message.image} alt="sendImage" />}
      </div>
    </div>
  );
}

export default Message;
