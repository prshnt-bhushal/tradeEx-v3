import React, { useState } from 'react';
import { MdFileUpload } from 'react-icons/md';
import UploadPostDialog from '../components/UploadPostDailog';

const Profile = () => {
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
        <div className="profile-container"></div>
      </div>
      <UploadPostDialog isOpen={isDialogOpen} onClose={closeUploadDialog} />
    </div>
  );
};

export default Profile;
