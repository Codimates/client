import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaLock, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function SignCompo() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const logingUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post('/user/login', { email, password });
      const userData = response.data;
      if (userData.error) {
          toast.error(userData.error);
      } else {
          setData({ email: '', password: '' }); // Clear input fields
          localStorage.setItem('user', JSON.stringify(userData));
          const role = userData.role;
          switch (role) {
              case 'customer':
                  navigate('/home');
                  break;
              default:
                  toast.error('Invalid role');
          }
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }
  
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='w-full max-w-md p-8 space-y-6 bg-[#19191A] rounded-lg shadow-md border border-orange-500'>
        
        {/* Header */}
        <h2 className='text-2xl font-semibold text-center text-white'>Sign In</h2>
        
        {/* Form */}
        <form className='space-y-4' onSubmit={logingUser}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className='block text-sm font-medium text-white text-start'>
              Email
            </label>
            <div className='relative flex items-center mt-1'>
              <FaEnvelope className='absolute text-orange-500 transform -translate-y-1/2 top-1/2 left-3' />
              <input 
                type="email" 
                name="email" 
                id="email"
                placeholder="Enter your email"
                className='w-full pl-10 pr-4 py-2 text-sm text-white bg-[#19191A] border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 h-12'
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className='block text-sm font-medium text-white text-start'>
              Password
            </label>
            <div className='relative mt-1'>
              <FaLock className='absolute text-orange-500 transform -translate-y-1/2 top-1/2 left-3' />
              <input 
                type="password" 
                name="password" 
                id="password"
                placeholder="Enter your password"
                className='w-full pl-10 pr-4 py-2 text-sm text-white bg-[#19191A] border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 h-12'
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className='text-right'>
            <button type="button" className='text-sm text-blue-500 hover:underline'>
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <div>
            <button 
              type="submit" 
              className='flex items-center justify-center w-full h-12 px-4 py-2 space-x-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600'
            >
              <FaSignInAlt />
              <span>Login</span>
            </button>
          </div>
          <div>
            <hr />
          </div>

          <div className='text-center'>
            <h1 className='text-white'>Don't have an account? Sign up</h1>
          </div>

          {/* Sign Up Link */}
          <div className='text-center'>
            <button type="button" className='flex items-center justify-center w-full h-12 px-4 py-2 space-x-2 text-sm text-yellow-500 border rounded-lg hover:text-orange-500'>
              <FaUserPlus />
              <span>Register</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
