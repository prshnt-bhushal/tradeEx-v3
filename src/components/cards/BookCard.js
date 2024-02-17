import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { RiShareForward2Fill } from 'react-icons/ri';
import { AuthContext } from '../../contexts/AuthContext';
import { FaRegMessage } from 'react-icons/fa6';
import { LiaExchangeAltSolid } from 'react-icons/lia';
// import { ChatContext } from '../../contexts/ChatContext';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';

function BookCard({ book }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  // const { dispatch } = useContext(ChatContext);
  const [user, setUser] = useState(null);
  // const [err, setErr] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (currentUser && book.postedUserId) {
        try {
          const userDoc = await getDoc(doc(db, 'users', book.postedUserId));
          if (userDoc.exists()) {
            setUser(userDoc.data());
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          // setErr(true);
        }
      }
    };

    fetchUser();
  }, [currentUser, book.postedUserId]);

  const handleSelect = async () => {
    // Ensure currentUser and user are available
    if (!currentUser || !user) {
      return;
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
          [combinedId]: {
            userId: user.uid,
            displayName: user.displayName,
            date: serverTimestamp(),
          },
        });
        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId]: {
            userId: currentUser.uid,
            displayName: currentUser.displayName,
            date: serverTimestamp(),
          },
        });
      }
      navigate('/messages');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <Link to={`/book`} className="product">
      <img src={book.postUrl} alt="Book" className="product-image" />
      <div className="product-details">
        <h2 className="product-title">{book.bookName}</h2>
        <p className="product-author">{book.author}</p>
        <p className="product-category">{book.category}</p>
      </div>
    </Link>
  );
}

{
  /* <div className="product-actions">
  <p className="product-publication">{book.publication}</p>
  <div className="product-posted-by">posted by: {book.postedUser}</div>
  {currentUser && currentUser.uid === book.postedUserId ? (
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
      <span className="action-link" onClick={handleSelect}>
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
</div> */
}
export default BookCard;
