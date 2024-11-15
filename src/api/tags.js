import axiosInstance from "./axiosInstance";

export const getAllTags = async () => {
  try {
    const response = await axiosInstance.get('/api/tags');
    return response.data;
  } catch (error) {
    console.error("Error occurred when calling /api/tags:", error);
    throw error;
  }
};

export const getTagsWithQuestionsCount = async () => {
  try {
    const response = await axiosInstance.get('/api/tags/with-count');
    return response.data;
  } catch (error) {
    console.error("Error occurred when calling /api/tags/with-count:", error);
    throw error;
  }
};