import React, { useContext, useEffect, useState } from 'react';
import BookCard from '../components/cards/BookCards';
import { AuthContext } from '../contexts/AuthContext';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [postedBooks, setPostedBooks] = useState([]);

  useEffect(() => {
    const getPostedBooks = () => {
      const postRef = collection(db, 'books');
      const q = query(postRef, where('postedUserId', '!=', currentUser.uid));
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
      <section className="Banner">
        <h1>Bookstore</h1>
        <p>Find your next favorite book</p>
        <div className="BookContainer">
          {postedBooks.length > 0 ? (
            postedBooks.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
            <p>No books uploaded yet</p>
          )}
        </div>
      </section>
      <section className="NewArriavle"></section>
      <section className="MostReviewed"></section>
      <section className="BestSeller"></section>
    </div>
  );
};

export default Home;
