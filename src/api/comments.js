import axiosInstance from "./axiosInstance";

export const postComment = async ({ body, answerId }) => {
  try {
    const response = await axiosInstance.post(
      `api/comments`,
      { body, answerId },
    );
  
    return response.data;
  } catch(error) {
    console.error("Error creating a new comment:", error);
    throw error;
  }
};

export const updateComment = async (commentId, data) => {
  try {
    const response = await axiosInstance.put(`/api/comments/${commentId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await axiosInstance.delete(`/api/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};
