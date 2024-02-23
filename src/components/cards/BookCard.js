import React from 'react';
import { useNavigate } from 'react-router-dom';

function BookCard({ book }) {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/book/${book.id}`, { state: { book } });
  };

  return (
    <div className="product" onClick={handleBookClick}>
      <img src={book.postUrl} alt="Book" className="product-image" />
      <div className="product-details">
        <h2 className="product-title">{book.bookName}</h2>
        <p className="product-author">{book.author}</p>
        <p className="product-category">{book.category}</p>
      </div>
    </div>
  );
}

export default BookCard;
