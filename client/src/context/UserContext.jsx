/* eslint-disable react/prop-types */

import { createContext, useState, useEffect, useContext } from 'react';
import { getUserProfile } from '../services/api'; // API to get the user profile from backend

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserProfile(); // Fetch user profile including the role
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUser = () => useContext(UserContext);