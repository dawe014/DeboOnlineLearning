import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ProfilePage from './Profile/ProfilePage';
import apiClient from '../api/apiClient';
import Loader from '../components/Loader';

const MyProfilePage = () => {
  const [user, setUser] = useState({}); // State to hold user data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await apiClient.get('/api/v1/users/me');
        if (response.status !== 200) {
          throw new Error('Failed to fetch user profile');
        }

        const data = response.data.data;
        setUser(data); 
        setLoading(false); 
      } catch (error) {
        console.error('Error:', error);
        setLoading(false); // Stop loading on error
      }
    };

    fetchUserProfile(); // Call the fetch function on mount
  }, []); 

  if (loading) {
    return <Loader/>; // Show loading state until data is fetched
  }

  if (!user) {
    return <div>No user data found</div>; 
  }

  return (
    <>
      <Header />
      <ProfilePage user={user} />
    </>
  );
};

export default MyProfilePage;
