import React, { useState } from 'react';
import axios from 'axios';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { app } from './firebase';

const SubmissionForm = () => {
 
  const [name, setName] = useState('');
  const [socialHandle, setSocialHandle] = useState('');


  const [images, setImages] = useState([]); 
  const [files, setFiles] = useState([]);   


  const [message, setMessage] = useState('');
  const [imageUploadError, setImageUploadError] = useState('');
  const [uploading, setUploading] = useState(false);

 
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    
    if (selectedFiles.length + images.length > 6) {
      setImageUploadError('You can only upload up to 6 images.');
      return;
    }

    for (let i = 0; i < selectedFiles.length; i++) {
      if (selectedFiles[i].size > 2 * 1024 * 1024) { 
        setImageUploadError('Each image must be less than 2MB.');
        return;
      }
    }

    
    setFiles(selectedFiles);
    setImageUploadError('');
    uploadImages(selectedFiles);
  };


  const uploadImages = async (selectedFiles) => {
    setUploading(true);
    setImageUploadError('');
    const storage = getStorage(app);
    const uploadPromises = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const fileName = `${new Date().getTime()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

     
      const promise = new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload of ${file.name} is ${progress}% done`);
          },
          (error) => {
            reject(error);
          },
          () => {
           
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                resolve(downloadURL);
              })
              .catch((error) => {
                reject(error);
              });
          }
        );
      });

      uploadPromises.push(promise);
    }

    try {
      const downloadURLs = await Promise.all(uploadPromises);
      setImages((prevImages) => [...prevImages, ...downloadURLs]); 
      setUploading(false);
    } catch (error) {
      console.error(error);
      setImageUploadError('Image upload failed. Please try again.');
      setUploading(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (uploading) {
      setMessage('Please wait until images are uploaded.');
      return;
    }

  
    if (images.length === 0) {
      setMessage('Please upload at least one image.');
      return;
    }


    const data = {
      name,
      socialHandle,
      images,
    };

    try {
     
      const res = await axios.post('/backend/user/userdata', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

     
      setMessage(res.data.message);
      setName('');
      setSocialHandle('');
      setImages([]);
      setFiles([]);


 
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">User Submission Form</h2>

      
        {message && (
          <div className={`mb-4 p-3 text-center rounded ${message.includes('success') ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {message}
          </div>
        )}

        {imageUploadError && (
          <div className="mb-4 p-3 text-center text-white rounded bg-red-500">
            {imageUploadError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
         
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="socialHandle">
              Social Media Handle:
            </label>
            <input
              type="text"
              id="socialHandle"
              value={socialHandle}
              onChange={(e) => setSocialHandle(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your social media handle"
            />
          </div>

         
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="images">
              Upload Images:
            </label>
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-gray-700"
              disabled={uploading}
            />


            {uploading && (
              <p className="text-gray-600 mt-2">Uploading images, please wait...</p>
            )}

          
            {images.length > 0 && (
              <div className="mt-2 flex flex-wrap">
                {images.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-16 h-16 object-cover mr-2 mb-2 rounded-md"
                  />
                ))}
              </div>
            )}
          </div>

       
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ${
              uploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmissionForm;
