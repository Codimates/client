import React from 'react';
import SignCompo from '../../components/userRegAndSignCompo/SignCompo';
import BG1 from '../../images/bg1.jpg';

export default function SignPage() {
  return (
    <div
      style={{
        backgroundImage: `url(${BG1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        height: '100vh',
        width: '100vw',
      }}
    >
      {/* Background Blur and Opacity Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Reduce opacity
          backdropFilter: 'blur(10px)', // Apply blur effect
          zIndex: 1, // Ensure it stays below the content
        }}
      ></div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2, // Ensure content is on top of the overlay
        }}
      >
        <SignCompo />
      </div>
    </div>
  );
}
