import React, { useEffect, useState } from 'react';
import '../styles/RightMenu.css';
import VerticalText from './VerticalText';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';


const RightMenu = () => {
  const [profilePhoto, setProfilePhoto] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    // Fetch user data from backend
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token')
        if(!token) return;

        const decoded = jwtDecode(token);
        const userId = decoded.id;

        const response = await axios.get(`/profile/${userId}`); // Adjust the endpoint as necessary
        setProfilePhoto(response.data.profilePhoto);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileClick = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleLogout = () => {
    // Clear the token from localStorage and redirect
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className='right-menu'>
      <div className="right-top" onClick={handleProfileClick}>
        <img className='profile-pic' src={profilePhoto || 'https://placehold.co/400'} alt='Profile' />
      </div>
      {isPopupVisible && (
        <div className="popup">
          <button className='logout-button' onClick={handleLogout}>Logout</button>
        </div>
      )}
      <VerticalText/>
    </div>
  );
}

export default RightMenu;
