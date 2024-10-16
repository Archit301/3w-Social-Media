
import React, { useState } from 'react';
import axios from 'axios';
 import { useNavigate } from 'react-router-dom';


const AdminLoginForm = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

 
  const [showPassword, setShowPassword] = useState(false);

   const navigate = useNavigate(); 

 
  const handleSubmit = async (e) => {
    e.preventDefault();

  
    setMessage('');
    setError('');

   
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);

    try {
      
      const response = await axios.post('/backend/user/check', {
        username,
        password,
      });
         console.log(response)
      if (response.data==="Login Successfully") {
        setMessage('Login successful! Redirecting...');
       
        setTimeout(() => {
           navigate('/dashboard');
        }, 1500);
      } else {
        setError(response.data.message || 'Invalid credentials.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Admin Login</h2>

   
        {message && (
          <div className="mb-4 p-3 text-center text-white rounded bg-green-500">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 text-center text-white rounded bg-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
       
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>

       
          <div className="mb-6 relative">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password:
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              placeholder="Enter your password"
            />
           
            
          </div>

      
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginForm;
