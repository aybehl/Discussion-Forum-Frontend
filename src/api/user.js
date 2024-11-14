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
