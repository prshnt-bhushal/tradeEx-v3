import React from 'react';
import BookCards from '../components/cards/BookCards';

const Home = () => {
  return (
    <div className="HomeContainer">
      <section className="Banner">
        <h1>Bookstore</h1>
        <p>Find your next favorite book</p>
        <div className="BookContainer">
          <BookCards />
          <BookCards />
          <BookCards />
          <BookCards />
          <BookCards />
        </div>
      </section>
      <section className="NewArriavle"></section>
      <section className="MostReviewed"></section>
      <section className="BestSeller"></section>
    </div>
  );
};

export default Home;
