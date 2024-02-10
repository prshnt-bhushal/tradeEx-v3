import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { RiShareForward2Fill } from 'react-icons/ri';
import { AuthContext } from '../../contexts/AuthContext';
import { FaRegMessage } from 'react-icons/fa6';
import { LiaExchangeAltSolid } from 'react-icons/lia';
import { ChatContext } from '../../contexts/ChatContext';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';

function BookCard({ book }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { dispatch } = useContext(ChatContext);
  //   const handleMessage = async () => {};
  const handleSelect = async (u) => {
    // Ensure currentUser is available
    if (!currentUser) {
      return;
    }

    const q = query(
      collection(db, 'users'),
      where('uid', '==', book.postedUserId)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        setUser(userData);
        // Dispatch action after setting user
        dispatch({ type: 'CHANGE_USER', payload: u });
      });
    } catch (error) {
      setErr(true);
    }

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      // create chat if it doesn't exist
      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), {
          messages: [],
        });

        // create user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userId']: {
            uid: user.uid,
            displayName: user.displayName,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userId']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
      navigate('/messages');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="product">
      <img src={book.postUrl} alt="Book" className="product-image" />
      <div className="product-details">
        <div className="grid-grow">
          <h2 className="product-title">{book.bookName}</h2>
          <p className="product-category">{book.category}</p>
          <p className="product-author">{book.author}</p>
          <p className="product-publication">{book.publication}</p>
          <div className="product-posted-by">posted by: {book.postedUser}</div>
        </div>
        <div className="product-actions">
          {currentUser.uid === book.postedUserId ? (
            <>
              <Link to={`/edit/`} className="action-link">
                <FaRegEdit size={16} />
              </Link>
              <Link to={`/delete/`} className="action-link">
                <FaRegTrashAlt size={16} />
              </Link>
            </>
          ) : (
            <>
              <span className="action-link" onClick={() => handleSelect(user)}>
                <FaRegMessage size={16} />
              </span>

              <Link to={`/exchange:`} className="action-link">
                <LiaExchangeAltSolid size={16} />
              </Link>
            </>
          )}
          <Link to={`/share/`} className="action-link">
            <RiShareForward2Fill size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
