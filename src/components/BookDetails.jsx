import React from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import demoBook from '../assets/img/bookImage.png';
import BookCard from './cards/BookCard';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';

function BookDetails() {
  return (
    <div className="HomeContainer">
      <h2>Book Details</h2>
      {/* back button */}
      <Link to="/" className="backButton">
        <IoArrowBack size={24} />
      </Link>
      <div className="BookDetails">
        <img className="BookImage" src={demoBook} alt="Book" />
        <div className="BookDetails-info">
          <div className="bookInfo">
            <h2>Book Title</h2>
            <span>Category, Author</span>
            <p>Descriptions</p>
          </div>
          <div className="user-details">
            <img className="UserProfile" src="" alt="posted user" />
            <p>Posted Date</p>
            <p>Posted By</p>
          </div>
        </div>
        <div className="book-actions">
          <Link to={`/edit/`} className="action-link">
            <FaRegEdit size={24} />
          </Link>
          <Link to={`/delete/`} className="action-link">
            <FaRegTrashAlt size={24} />
          </Link>
        </div>
      </div>
      {/* Similar Books */}
      <h2>Similar Books</h2>
      <div className="BookCardContainer">Books</div>
    </div>
  );
}

export default BookDetails;
