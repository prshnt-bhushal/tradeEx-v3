import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/stylesheets/style.scss';

import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import NoPage from './pages/NoPage';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <AuthProvider> */}
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      {/* </AuthProvider> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
