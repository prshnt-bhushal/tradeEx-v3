import React, { useContext, useState } from 'react';
import { FaCameraRetro } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';
import { ChatContext } from '../../contexts/ChatContext';
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
function SendMessage() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    setText('');
    // if (image) {
    //   const storageRef = ref(storage, `chatImages/${image.name}`);
    //   uploadBytes(storageRef, image).then((snapshot) => {
    //     getDownloadURL(storageRef, image).then(async (url) => {
    //       const downloadURL = url;
    //       await updateDoc(doc(db, 'chats', data.chatId), {
    //         messages: arrayUnion({
    //           id: uuid(),
    //           text,
    //           senderId: currentUser.uid,
    //           date: Timestamp.now(),
    //           imageUrl: downloadURL,
    //         }),
    //       });
    //     });
    //   });
    // } else {
    await updateDoc(doc(db, 'chats', data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });
    // }

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });
    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });

    // setImage(null);
  };
  return (
    <div className="sendMessage">
      {/* <input
        style={{ display: 'none' }}
        type="file"
        name="sendpic"
        id="sendpic"
        value={image}
        onChange={(e) => setImage(e.target.files[0])}
      />
      <label for="sendpic">
        <FaCameraRetro size={25} />
      </label> */}
      <input
        type="text"
        placeholder="Type Something... "
        value={text}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSend();
          }
        }}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default SendMessage;
