import React from 'react';
import { FaCameraRetro } from 'react-icons/fa';

function SendMessage() {
  return (
    <div className="sendMessage">
      <input
        style={{ display: 'none' }}
        type="file"
        name="sendpic"
        id="sendpic"
      />
      <label for="sendpic">
        <FaCameraRetro size={25} />
      </label>
      <input type="text" placeholder="Type Something... " />
      <button>Send</button>
    </div>
  );
}

export default SendMessage;
