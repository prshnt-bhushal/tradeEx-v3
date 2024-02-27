import React, { useContext, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FaCameraRetro } from 'react-icons/fa';
// import BookCategoryList from './BookCategoryList';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { AuthContext } from '../contexts/AuthContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SendBookRequestDialog({ isOpen, onClose }) {
  const { currentUser } = useContext(AuthContext);
  const [message, setMessage] = useState(
    "Hi there! I noticed your book and I'm interested in exchanging it with mine. Would you be open to discussing further?"
  );

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform your logic here, such as sending the message
    // For demonstration purposes, let's just log the message
    console.log('Message sent:', message);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="dialogContainer">
      <div className="dialogWrapper">
        <Dialog.Panel className="dialog-panel">
          <Dialog.Title as="h3" className="title">
            Send Book Request
          </Dialog.Title>

          <form onSubmit={handleSubmit}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message..."
              className="message-input"
            />
            <div className="btn-collection">
              <button type="button" className="cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="confirm">
                Send
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default SendBookRequestDialog;
