import axiosInstance from "./axiosInstance";

export const editUserProfile = async (userId) => {
  try {
    const response = await axiosInstance.put(`/api/users/${userId}/profile`, userData);
    return response.data;
  } catch (error) {
    console.error("Error occurred when calling /api/users/{userId}/profile:", error);
    throw error;
  }
}