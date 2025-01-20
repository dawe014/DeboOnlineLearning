import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ProfilePage from './Profile/ProfilePage';
import apiClient from '../api/apiClient';

const MyProfilePage = () => {
  const [user, setUser] = useState({}); // State to hold user data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Assuming you have an API endpoint to get the user profile
        const response = await apiClient.get('/api/v1/users/me');
        console.log('respnse',response.status);
        if (response.status !== 200) {
          throw new Error('Failed to fetch user profile');
        }

        const data = response.data.data;
        console.log('dara', data)
        setUser(data); // Assuming the response returns a 'user' object
        setLoading(false); // Set loading to false when data is loaded
      } catch (error) {
        console.error('Error:', error);
        setLoading(false); // Stop loading on error
      }
    };

    fetchUserProfile(); // Call the fetch function on mount
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Show loading state until data is fetched
  }
  console.log('user', user);

  if (!user) {
    return <div>No user data found</div>; // Handle the case where user data is not available
  }

  return (
    <>
      <Header />
      <ProfilePage user={user} />
    </>
  );
};

export default MyProfilePage;
