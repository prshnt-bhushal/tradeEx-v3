import React from 'react';
import ReactDOM from 'react-dom';
import './assets/stylesheets/style.scss';

import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContextProvider>
);
