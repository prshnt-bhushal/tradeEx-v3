import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import { AuthContext } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    signOut(auth).then(() => {
      alert('User signed out');
    });
    navigate('/login');
  }
  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        {currentUser ? (
          <div className="userInfo">
            <img src={currentUser.photoURL} alt="avatar" />
            <Link onClick={handleLogout}>Logout</Link>
            <Link to="/messages">Messages</Link>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
