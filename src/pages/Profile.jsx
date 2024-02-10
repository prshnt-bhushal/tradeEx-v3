import React, { useContext, useState } from 'react';
import { MdFileUpload } from 'react-icons/md';
import UploadPostDialog from '../components/UploadPostDailog';
import { AuthContext } from '../contexts/AuthContext';
import UploadBookCard from '../components/cards/UploadBookCard';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeUploadDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <div className="profileContainer">
      <h1>Profile</h1>
      <div className="profile-wrapper">
        <div className="content-upload-btn" onClick={openDialog}>
          <MdFileUpload size={24} />
          Upload
        </div>
        <div className="profile-container">
          <div className="profile-image">
            <img src={currentUser.photoURL} alt="profile" />
          </div>
          <div className="profile-details">
            <h2>John Doe</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="uploadedcard">
          <UploadBookCard />
        </div>
      </div>
      <UploadPostDialog isOpen={isDialogOpen} onClose={closeUploadDialog} />
    </div>
  );
};

export default Profile;
