import React, { useState } from 'react';
import { FaCameraRetro, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [avatarFileName, setAvatarFileName] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');

  const handleFileChange = (event) => {
    const fileName = event.target.files[0]?.name;
    setAvatarFileName(fileName);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h1 className="logo">TradeEx</h1>
        <h2 className="title">Sign In</h2>
        <form>
          <input type="email" placeholder="email" required />
          <div className="passwordWrapper">
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordVisible ? (
              <FaEyeSlash
                className="eyeIcon"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <FaEye className="eyeIcon" onClick={togglePasswordVisibility} />
            )}
          </div>
          <p>Forgot Password ?</p>
          <button>Sign In</button>
        </form>
        <p>Don't have an account ? Register </p>
      </div>
    </div>
  );
};

export default Login;
