import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import { AuthContext } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Menu } from '@headlessui/react';

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    signOut(auth).then(() => {
      alert('User signed out');
      navigate('/login');
    });
  }
  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <ul>
        {currentUser ? (
          <div className="userInfo">
            <span className="user-name">
              Welcome, {currentUser.displayName}
            </span>
            <Menu>
              <Menu.Button className="menu-button">
                <img
                  src={currentUser.photoURL}
                  alt="user"
                  className="user-img"
                />
              </Menu.Button>
              <Menu.Items className="custom-menu-items">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/profile"
                      className={`menu-link ${
                        active ? 'bg-blue-500 text-white' : 'text-black'
                      }`}
                    >
                      <span className="flex gap-2 items-center">
                        <i className="fa-solid fa-user"></i>
                        Profile
                      </span>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/messages"
                      className={`menu-link ${
                        active ? 'bg-blue-500 text-white' : 'text-black'
                      }`}
                    >
                      <span className="flex gap-2 items-center">
                        <i className="fa-regular fa-message"></i>
                        Messages
                      </span>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/settings"
                      className={`menu-link ${
                        active ? 'bg-blue-500 text-white' : 'text-black'
                      }`}
                    >
                      <span className="flex gap-2 items-center">
                        <i className="fa-solid fa-gear"></i>
                        Settings
                      </span>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/help"
                      className={`menu-link ${
                        active ? 'bg-blue-500 text-white' : 'text-black'
                      }`}
                    >
                      <span className="flex gap-2 items-center">
                        <i className="fa-solid fa-circle-info"></i>
                        Help
                      </span>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={`menu-link ${
                        active ? 'bg-blue-500 text-white' : 'text-black'
                      }`}
                      onClick={handleLogout}
                    >
                      <span className="flex gap-2 items-center">
                        <i className="fa-solid fa-right-from-bracket"></i>
                        Logout
                      </span>
                    </Link>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
