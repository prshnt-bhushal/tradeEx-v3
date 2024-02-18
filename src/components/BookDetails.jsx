import React, { useContext, useEffect, useState } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FaRegMessage } from 'react-icons/fa6';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  limit,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import BookCard from './cards/BookCard';

function formatDate(timestamp) {
  const milliseconds =
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
  const dateObject = new Date(milliseconds);

  const formattedDate = dateObject.toLocaleString();
  return formattedDate;
}

function BookDetails() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { book } = location.state;
  const [postedUser, setPostedUser] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);

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

  useEffect(() => {
    const fetchSimilarBooks = async () => {
      try {
        // Query books by the same user
        const userBooksQuery = query(
          collection(db, 'books'),
          where('postedUserId', '==', book.postedUserId),
          where('id', '!=', book.id), // Exclude the current book
          limit(4) // Limit to 4 books
        );
        const userBooksSnapshot = await getDocs(userBooksQuery);
        let similarBooksData = [];
        userBooksSnapshot.forEach((doc) => {
          similarBooksData.push(doc.data());
        });

        // If not enough similar books found, query books with the same author
        if (similarBooksData.length < 4) {
          const authorBooksQuery = query(
            collection(db, 'books'),
            where('author', '==', book.author),
            where('id', '!=', book.id),
            limit(4 - similarBooksData.length) // Limit to remaining books
          );
          const authorBooksSnapshot = await getDocs(authorBooksQuery);
          authorBooksSnapshot.forEach((doc) => {
            similarBooksData.push(doc.data());
          });
        }

        // If still not enough similar books found, query books in the same category
        if (similarBooksData.length < 4) {
          const categoryBooksQuery = query(
            collection(db, 'books'),
            where('category', '==', book.category),
            where('id', '!=', book.id),
            limit(4 - similarBooksData.length) // Limit to remaining books
          );
          const categoryBooksSnapshot = await getDocs(categoryBooksQuery);
          categoryBooksSnapshot.forEach((doc) => {
            similarBooksData.push(doc.data());
          });
        }

        setSimilarBooks(similarBooksData);
      } catch (error) {
        console.error('Error fetching similar books:', error);
      }
    };

    fetchSimilarBooks();
  }, [book.postedUserId, book.author, book.category, book.id]);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'books', book.id));
      alert('Book deleted successfully');
      navigate('/profile');
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-book/${book.id}`);
  };

  const handleMessage = () => {
    if (!currentUser) {
      alert('Please login to send a message');
      navigate('/login');
      return;
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
      <h2>Similar Books</h2>
      <div className="BookCardContainer">
        {similarBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default BookDetails;
