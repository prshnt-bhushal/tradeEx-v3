// UploadBookCard.js

import React from 'react';
import demobook from '../../assets/img/bookImage.png';
import { Link } from 'react-router-dom';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import {
  RiArchiveFill,
  RiMailSendFill,
  RiShareForward2Fill,
} from 'react-icons/ri';

function UploadBookCard({ book }) {
  return (
    <div className="product">
      <img src={demobook} alt="Book" className="product-image" />
      <div className="product-details">
        <div className="grid-grow">
          <h2 className="product-title">{book.bookName}</h2>
          <p className="product-category">{book.category}</p>
          <p className="product-author">{book.author}</p>
          <p className="product-publication">{book.publication}</p>
          <p className="product-description">{book.bookDescription}</p>
          <div className="product-posted-by">posted by: {book.postuser}</div>
        </div>
        <div className="product-actions">
          <Link to={`/edit/${book.id}`} className="action-link">
            <FaRegEdit size={16} />
          </Link>
          <Link to={`/delete/${book.id}`} className="action-link">
            <FaRegTrashAlt size={16} />
          </Link>
          {book.status === 'archive' ? (
            <Link to={`/archive/${book.id}`} className="action-link">
              <RiArchiveFill size={16} />
            </Link>
          ) : (
            <Link to={`/post/${book.id}`} className="action-link">
              <RiMailSendFill size={16} />
            </Link>
          )}
          <Link to={`/share/${book.id}`} className="action-link">
            <RiShareForward2Fill size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UploadBookCard;
