import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FaCameraRetro } from 'react-icons/fa';

function UploadPostDialog({ isOpen, onClose }) {
  const [postTitle, setPostTitle] = useState('');
  const [bookName, setBookName] = useState(null);

  const handleSubmit = () => {
    // Handle the form submission logic here
    // You can send the postTitle to your backend or perform any other actions
    console.log('Post Title:', postTitle);
    // Close the dialog after submission
    onClose();
  };

  const handleFileChange = (event) => {
    const fileName = event.target.files[0]?.name;
    setBookName(fileName);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="dialogContainer">
      <div className="dialogWrapper">
        {/* <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span> */}

        <Dialog.Panel className="dialog-panel">
          <Dialog.Title as="h3" className="title">
            Upload Post
          </Dialog.Title>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="bookName"
              name="bookName"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
              placeholder="Enter Book Name"
              required
            />
            <input
              type="text"
              id="bookAuthor"
              name="bookAuthor"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
              placeholder="Author's Name"
              required
            />
            <input
              style={{ display: 'none' }}
              type="file"
              id="bookUpload"
              accept=".jpg, .jpeg, .png, .gif"
              onChange={handleFileChange}
            />
            <label htmlFor="bookUpload">
              <FaCameraRetro size={24} />
              <span>
                {bookName ? `Book: ${bookName}` : 'Upload Book Image'}
              </span>
            </label>
            <input
              type="text"
              id="bookPublication"
              name="bookPublication"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
              placeholder="Publication"
              required
            />

            <textarea
              type="textarea"
              id="bookDescription"
              name="bookDescription"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="mt-1 p-3 resize-none w-full border border-gray-300 rounded-md"
              placeholder="Description"
              required
            />

            <div className="btn-collection">
              <button type="button" className="cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="confirm">
                Upload
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default UploadPostDialog;
