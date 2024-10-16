import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EyeIcon } from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/backend/user/fetchdata');

        // Ensure that the response is an array
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error('Invalid data format:', response.data);
          setUsers([]); 
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleViewImages = (images) => {
    setSelectedImages(images);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Admin Dashboard</h1>
  
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
            <style jsx>{`
              .loader {
                border-top-color: #3498db;
                animation: spin 1s linear infinite;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">Failed to load user data. Please try again later.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="py-3 px-6 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="py-3 px-6 bg-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Social Handle</th>
                  <th className="py-3 px-6 bg-gray-200 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">Images</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) && users.length > 0 ? (
                  users.map(user => (
                    <tr key={user.id} className="border-b">
                      <td className="py-4 px-6 text-sm text-gray-700">{user.name}</td>
                      <td className="py-4 px-6 text-sm text-gray-700">{user.socialHandle}</td>
                      <td className="py-4 px-6 text-sm text-gray-700 text-center">
                        <div className="flex flex-col items-center">
                          <button
                            onClick={() => handleViewImages(user.images)}
                            className="text-blue-500 hover:text-blue-700 mb-2 flex items-center justify-center"
                          >
                            <EyeIcon className="h-5 w-5 mr-1" />
                            View Images
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-4 px-6 text-sm text-gray-700 text-center">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
  
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-3xl w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">User Images</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectedImages.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`User Image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-md"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
