import axiosInstance from "./axiosInstance";

export const getAllQuestions = async (page = 0, size = 10) => {
  try {
    const response = await axiosInstance.get('/api/questions', {
      params: { page, size },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching all questions:', error);
    throw error;
  }
};

export const getQuestionsByTags = async (tagIds, page = 0, size = 10) => {
  try {
    const response = await axiosInstance.get('/api/questions/tags', {
      params: { page, size },
      paramsSerializer: () => `tagIds=${tagIds.join(',')}&page=${page}&size=${size}`,
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching questions by tags:', error);
    throw error;
  }
};