import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { FaCameraRetro, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const avatar = event.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, username);
      const uploadTask = uploadBytesResumable(storageRef, avatar);

      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: username,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'userChats', res.user.uid), {});
            navigate('/');
          });
        }
      );
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h1 className="logo">TradeEx</h1>
        <h2 className="title">Sign up</h2>
        <form onSubmit={handleSubmit}>
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
              <FaEye className="eyeIcon" onClick={togglePasswordVisibility} />
            ) : (
              <FaEyeSlash
                className="eyeIcon"
                onClick={togglePasswordVisibility}
              />
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
          {err && <p className="error">Something went wrong</p>}
        </form>
        <p>
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
