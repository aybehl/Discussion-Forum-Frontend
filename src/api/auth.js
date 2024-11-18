import axiosInstance from './axiosInstance';

export const signup = async (userData) => {
  try {
    const response = await axiosInstance.post('/api/auth/signup', userData);
    return response.data;
  } catch (error) {
    console.error("Error occurred when calling /api/auth/signup:", error);
    throw error;
  }
};

export const logIn = async (userData) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', userData);
    return response.data;
  } catch (error) {
    console.error("Error occurred when calling /api/auth/login:", error);
    throw error;
  }
};

