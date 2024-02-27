import React, { useContext, useEffect, useState } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FaRegMessage } from 'react-icons/fa6';
import {
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import SimilarBooks from './books/SimilarBooks';
import { ChatContext } from '../contexts/ChatContext';

function formatDate(timestamp) {
  const milliseconds =
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
  const dateObject = new Date(milliseconds);

  const formattedDate = dateObject.toLocaleString();
  return formattedDate;
}

function BookDetails() {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { book } = location.state;
  const [postedUser, setPostedUser] = useState(null);
  console.log('postedUser', postedUser);

  useEffect(() => {
    const fetchPostedUser = async () => {
      try {
        if (!book.postedUserId) {
          console.error('No postedUserId provided');
          return;
        }

        const userDoc = await getDoc(doc(db, 'users', book.postedUserId));
        if (userDoc.exists()) {
          setPostedUser(userDoc.data());
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchPostedUser();
  }, [book.postedUserId]);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'books', book.id));
      toast.success('Book deleted successfully');
      navigate('/profile');
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-book/${book.id}`);
  };

  const handleMessage = async () => {
    if (!currentUser) {
      toast.error('Please login to send a message');
      return;
    } else {
      try {
        const combinedId =
          currentUser.uid > book.postedUserId
            ? currentUser.uid + book.postedUserId
            : book.postedUserId + currentUser.uid;

        const res = await getDoc(doc(db, 'chats', combinedId));

        // create chat if it doesn't exist
        if (!res.exists()) {
          await setDoc(doc(db, 'chats', combinedId), {
            messages: [],
          });

          // create user chats
          await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [combinedId + '.userId']: {
              uid: book.postedUserId,
              displayName: postedUser.displayName,
              photoURL: postedUser.photoURL,
            },
            [combinedId + '.date']: serverTimestamp(),
          });
          await updateDoc(doc(db, 'userChats', book.postedUserId), {
            [combinedId + '.userId']: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedId + '.date']: serverTimestamp(),
          });
        }

        dispatch({
          type: 'UPDATE_CHAT',
          payload: {
            chatId: combinedId,
            user: postedUser,
          },
        });

        navigate(`/messages`);
      } catch (error) {
        console.error('Error creating chat:', error);
      }
    }
  };

  return (
    <div className="HomeContainer">
      <h2>Book Details</h2>
      <Link to="/" className="backButton">
        <IoArrowBack size={24} />
      </Link>
      <div className="BookDetails">
        <img className="BookImage" src={book.postUrl} alt="Book" />
        <div className="BookDetails-info">
          <div className="bookInfo">
            <h2>{book.bookName}</h2>
            <span>
              {book.category}, {book.author}
            </span>
            <p>Publication: {book.publication}</p>
            <p>{book.description}</p>
          </div>
          <div className="user-details">
            <img
              className="UserProfile"
              src={postedUser?.photoURL}
              alt="posted user"
            />
            <p>Posted by: {postedUser?.displayName},</p>
            <p>on: {formatDate(book.postedDate)}</p>
          </div>
        </div>
        <div className="book-actions">
          {currentUser && currentUser.uid === book.postedUserId ? (
            <>
              <button onClick={handleEdit} className="action-button">
                <FaRegEdit className="action" size={24} />
              </button>
              <button onClick={handleDelete} className="action-button">
                <FaRegTrashAlt className="delete" size={24} />
              </button>
            </>
          ) : (
            <button onClick={handleMessage} className="action-button">
              <FaRegMessage className="action" size={24} />
            </button>
          )}
        </div>
      </div>
      <div className="BookCardContainer">
        <SimilarBooks book={book} />
      </div>
    </div>
  );
}

export default BookDetails;
