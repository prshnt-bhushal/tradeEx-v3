import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SendBookRequestDailog from '../SendBookRequestDailog';

function BookCard({ book, selected }) {
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeUploadDialog = () => {
    setIsDialogOpen(false);
  };

  const handleBookClick = () => {
    if (selected) {
      openDialog();
    } else {
      navigate(`/book/${book.id}`, { state: { book } });
    }
  };

  return (
    <>
      <div className="product" onClick={handleBookClick}>
        <img src={book.postUrl} alt="Book" className="product-image" />
        <div className="product-details">
          <h2 className="product-title">{book.bookName}</h2>
          <p className="product-author">{book.author}</p>
          <p className="product-category">{book.category}</p>
        </div>
      </div>
      <SendBookRequestDailog
        isOpen={isDialogOpen}
        onClose={closeUploadDialog}
      />
    </>
  );
}

export default BookCard;
