import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import BookCard from '../components/cards/BookCard';
import { Link, useParams } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

const ChooseOption = () => {
  const { currentUser } = useContext(AuthContext);
  const [postedBooks, setPostedBooks] = useState([]);
  const { bookId } = useParams(); // Extracting bookId from URL params

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
        {/* <Link to={`/book/${bookId}`} className="backButton">
          <IoArrowBack size={24} />
        </Link> */}
        <div className="HomeContainer">
          <h2>Select Book for Exchange</h2>
          <div className="BookContainer">
            {postedBooks.length > 0 ? (
              postedBooks.map((book) => (
                <BookCard selected={true} key={book.id} book={book} />
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
