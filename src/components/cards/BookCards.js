import React from 'react';
import demobook from '../../assets/img/bookImage.png';

import { Link } from 'react-router-dom';
import { FaRegMessage } from 'react-icons/fa6';
import { LiaExchangeAltSolid } from 'react-icons/lia';
import { RiShareForward2Fill } from 'react-icons/ri';
function BookCard() {
  return (
    <div className="product">
      <img src={demobook} alt="Book" className="product-image" />
      <div className="product-details">
        <div className="grid-grow">
          <h2 className="product-title">bookName</h2>
          <p className="product-category">category</p>
          <p className="product-author">author</p>
          <p className="product-publication">publication</p>
          <p className="product-description">bookDescription</p>
          <div className="product-posted-by">posted by: postuser</div>
        </div>
        <div className="product-actions">
          <Link to={`/messages`} className="action-link">
            <FaRegMessage size={16} />
          </Link>
          <Link to={`/exchange:`} className="action-link">
            <LiaExchangeAltSolid size={16} />
          </Link>
          <Link to={`/share:`} className="action-link">
            <RiShareForward2Fill size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
