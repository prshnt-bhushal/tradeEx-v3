import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';

const NavBar = () => {
  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
      </ul>
    </nav>
  );
};

export default NavBar;
