import React, { useState } from 'react';
import { FaCameraRetro, FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
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
        <h2 className="title">Sign up</h2>
        <form>
          <input required type="text" placeholder="username" />
          <input required type="email" placeholder="email" />
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
          <input
            style={{ display: 'none' }}
            type="file"
            id="avatar"
            accept=".jpg, .jpeg, .png, .gif"
            onChange={handleFileChange}
          />
          <label htmlFor="avatar">
            <FaCameraRetro size={20} />
            <span>
              {avatarFileName
                ? `Avatar: ${avatarFileName}`
                : 'Choose any Avatar'}
            </span>
          </label>
          <button>Sign up</button>
        </form>
        <p>Already have an account ? Login</p>
      </div>
    </div>
  );
};

export default Register;
