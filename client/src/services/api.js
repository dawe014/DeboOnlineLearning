import axiosInstance from '../utils/axiosInstance';

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/v1/users/me'); // Backend API to get user info
    return response;
  } catch (error) {
    console.error('Error fetching user profile', error);
    throw error;
  }
};
