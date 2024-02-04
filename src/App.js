import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';

const App = () => {
  const location = useLocation();
  const getTitle = () => {
    const { pathname } = location;

    switch (pathname) {
      case '/':
        return 'Home - TradeEx';
      case '/contact':
        return 'Contact - TradeEx';
      case '/about':
        return 'About Us - TradeEx';
      case '/profile':
        return 'profile - TradeEx';
      default:
        return 'TradeEx';
    }
  };

  return (
    <>
      <head>
        <title>{getTitle()}</title>
      </head>
      <div className="container">
        <NavBar />
        <div>
          <Outlet />
        </div>
        {/* <footer className="bg-gray-200 text-center text-xs p-3">
          &copy; {new Date().getFullYear()} TradeEx - All Rights Reserved
          <span className="text-blue-500 hover:text-blue-600">
            {' '}
            | <a href="/terms-condition">Terms & Conditions</a>
          </span>
        </footer> */}
      </div>
    </>
  );
};

export default App;
