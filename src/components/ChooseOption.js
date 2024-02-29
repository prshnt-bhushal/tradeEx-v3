import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import BookCard from '../components/cards/BookCard';
import { useLocation } from 'react-router-dom';

const ChooseOption = () => {
  const { currentUser } = useContext(AuthContext);
  const [postedBooks, setPostedBooks] = useState([]);
  const location = useLocation();
  const { requestedBook } = location.state;

  console.log(requestedBook);

  useEffect(() => {
    const getPostedBooks = () => {
      const postRef = collection(db, 'books');
      const q = query(postRef, where('postedUserId', '==', currentUser.uid));
      onSnapshot(q, (snapshot) => {
        const pos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostedBooks(pos);
      });

      return () => {
        setPostedBooks([]);
      };
    };

    currentUser.uid && getPostedBooks();
  }, [currentUser.uid]);

  return (
    <div className="HomeContainer">
      <div className="profile-wrapper">
        <div className="HomeContainer">
          <h2>Select Book for Exchange</h2>
          <div className="BookContainer">
            {postedBooks.length > 0 ? (
              postedBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  requestedBook={requestedBook}
                />
              ))
            ) : (
              <p>No books uploaded yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseOption;
