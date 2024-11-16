import React from 'react';
import RegisterCompo from '../../components/userRegAndSignCompo/RegisterCompo';
import BG from '../../images/bg1.jpg';

const RegisterPage = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${BG})`, // Correctly passing the image URL
        }}
      ></div>

      {/* Overlay with blur effect */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

      {/* Content Container */}
      <div className="relative ">
        
          <RegisterCompo />
        
      </div>
    </div>
  );
};

export default RegisterPage;
