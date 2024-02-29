import React, { useContext, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

function SendBookRequestDialog({
  isOpen,
  onClose,
  requestedBook,
  selectedBook,
}) {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Create or update the chat
      const combinedId =
        currentUser.uid > requestedBook.postedUserId
          ? currentUser.uid + requestedBook.postedUserId
          : requestedBook.postedUserId + currentUser.uid;

      const res = await getDoc(doc(db, 'chats', combinedId));

      // create chat if it doesn't exist
      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), {
          messages: [],
        });

        // create user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userId']: {
            uid: requestedBook.postedUserId,
            displayName: requestedBook.postedUser.displayName,
            photoURL: requestedBook.postedUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
        await updateDoc(doc(db, 'userChats', requestedBook.postedUserId), {
          [combinedId + '.userId']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }

      // Dispatch action to update the chat with default message
      const defaultMessage = `Hi ${requestedBook.postedUser}, I want to exchange your book ${requestedBook.bookName} with my ${selectedBook.bookName}, it is an amazing book written by ${selectedBook.author}. Please let me know if you are interested. Thanks!`;

      await updateDoc(doc(db, 'chats', combinedId), {
        messages: [
          {
            sender: currentUser.uid,
            message: defaultMessage,
            timestamp: serverTimestamp(),
          },
        ],
      });

      // Navigate to messages page
      navigate(`/messages`);
    } catch (error) {
      console.error('Error sending book request:', error);
      toast.error('Failed to send book request');
    }

    // Close the dialog
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
              placeholder="Enter your message..."
              className="message-input"
              readOnly // Make the textarea read-only to prevent user input
              value={`Hi ${requestedBook.postedUser}, I want to exchange your book ${requestedBook.bookName} with my ${selectedBook.bookName}, it is an amazing book written by ${selectedBook.author}. Please let me know if you are interested. Thanks!`}
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
