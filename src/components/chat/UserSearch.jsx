import React from 'react';
import logo from '../../assets/img/logo.png';

function UserSearch() {
  return (
    <div className="search">
      <div className="userSearch">
        <input type="text" placeholder="Search for users" />
      </div>
      <div className="userChat">
        <img src={logo} alt="user avatar" />
        <div className="userChatInfo">
          <span className="userChatName">User Name</span>
        </div>
      </div>
    </div>
  );
}

export default UserSearch;
