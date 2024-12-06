import axiosInstance from "./axiosInstance";

export const postAnswer = async ({ body, questionId }) => {
  try {
    const response = await axiosInstance.post(
      `api/answers`,
      { body, questionId },
    );
  
    return response.data;
  } catch(error) {
    console.error("Error creating a new answer:", error);
    throw error;
  }
};

export const updateAnswer = async (answerId, data) => {
  try {
    const response = await axiosInstance.put(`/api/answers/${answerId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating answer:", error);
    throw error;
  }
};

export const deleteAnswer = async (answerId) => {
  try {
    const response = await axiosInstance.delete(`/api/answers/${answerId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting answer:", error);
    throw error;
  }
};
