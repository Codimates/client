import React, { useContext } from 'react';
import Logout from '../../components/logoutButton/Logout';
import CusHeaderBar from '../../components/custormerCompo/CusHeaderBar';
import { UserContext } from '../../context/UserContext';

export default function LandingPage() {
  const { user } = useContext(UserContext); 

  // Check if the user is loaded before trying to access user.fname
  return (
    <div>
      <div>
        <CusHeaderBar />
      </div>
      <h1>Hi customer</h1>
      <Logout />
      
      {/* Conditional rendering to handle the case when user is null */}
      <div>
        {user ? (
          <h1>{user.fname}</h1>
        ) : (
          <h1>Loading user data...</h1> // Fallback content
        )}
      </div>
    </div>
  );
}
