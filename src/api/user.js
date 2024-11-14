import axiosInstance from './axiosInstance';

const apiUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL;

export const editUserProfile = async (userId, userData) => {
  const formData = new FormData();

  formData.append('data', JSON.stringify({
    firstName: userData.firstName,
    lastName: userData.lastName,
    userName: userData.userName,
    bio: userData.bio,
  }));

  if (userData.profilePicture) {
    formData.append('profilePicFile', userData.profilePicture);
  }

  const response = await fetch(`${apiUrl}/api/users/${userId}/profile`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('jwtToken')}`
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to edit user profile');
  }

  return await response.json();
};

export const getUserProfile = async (userId) => {
  try {
    const response = await axiosInstance.get(`/api/users/${userId}/profile`);
    return response.data;
  } catch (error) {
    console.error("Error occurred when calling /api/users/{userId}/profile:", error);
    throw error;
  }
};