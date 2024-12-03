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