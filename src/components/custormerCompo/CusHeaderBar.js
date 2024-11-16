import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LOGO from '../../images/logo.png';
import { FaRegUser, FaGripLines } from 'react-icons/fa';
import { UserContext } from '../../context/UserContext';

export default function CusHeaderBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useContext(UserContext); // Add loading state

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleSignInClick = () => navigate('/signin');

  // Helper function to display user name or sign in button
  const renderUserSection = () => {
    if (loading) {
      return <span>Loading...</span>;
    }
    
    if (user) {
      return <span>{user.fname}</span>;
    }
    
    return <span>Sign In</span>;
  };

  return (
    <header className="bg-[#1A1A1D] shadow-md">
      <div className="flex items-center justify-between px-6 py-3 md:px-10">
        {/* Logo */}
        <img src={LOGO} alt="Logo" className="h-[60px]" />

        {/* Desktop Menu */}
        <div className="items-center hidden space-x-8 md:flex">
          <button className="text-white transition-colors duration-300 hover:text-gray-300">
            About us
          </button>
          <button className="text-white transition-colors duration-300 hover:text-gray-300">
            Contact us
          </button>
          <button
            onClick={handleSignInClick}
            className="flex items-center px-4 py-2 text-white transition-all duration-300 border border-gray-500 rounded-lg hover:bg-gray-700 hover:shadow-lg"
          >
            <img src={user.image} alt='user' className='w-10 h-10 rounded-full'></img>
            {renderUserSection()}
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleDropdown} className="text-white">
            <FaGripLines size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isDropdownOpen && (
        <div className="flex flex-col items-start px-6 py-3 bg-[#2A2A2D] md:hidden">
          <button className="w-full py-2 text-left text-white transition-colors duration-300 hover:text-gray-300">
            About us
          </button>
          <button className="w-full py-2 text-left text-white transition-colors duration-300 hover:text-gray-300">
            Contact us
          </button>
          <button
            onClick={handleSignInClick}
            className="flex items-center w-full py-2 text-left text-white transition-all duration-300 hover:text-gray-300"
          >
            <FaRegUser className="mr-2" />
            {renderUserSection()}
          </button>
        </div>
      )}
    </header>
  );
}