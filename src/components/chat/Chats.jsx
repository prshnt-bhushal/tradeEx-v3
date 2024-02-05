import React from 'react';
import logo from '../../assets/img/logo.png';

function Chats() {
  return (
    <div className="chats">
      <div className="userChat">
        <img src={logo} alt="user avatar" />
        <div className="userChatInfo">
          <span>User Name</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src={logo} alt="user avatar" />
        <div className="userChatInfo">
          <span>User Name</span>
          <p>Hello</p>
        </div>
      </div>
      {/* <div className="userChat">
        <img src={logo} alt="user avatar" />
        <div className="userChatInfo">
          <span>User Name</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src={logo} alt="user avatar" />
        <div className="userChatInfo">
          <span>User Name</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src={logo} alt="user avatar" />
        <div className="userChatInfo">
          <span>User Name</span>
          <p>Hello</p>
        </div>
      </div> */}
      {/* <div className="userChat">
        <img src={logo} alt="user avatar" />
        <div className="userChatInfo">
          <span>User Name</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src={logo} alt="user avatar" />
        <div className="userChatInfo">
          <span>User Name</span>
          <p>Hello</p>
        </div>
      </div> */}
    </div>
  );
}

export default Chats;
