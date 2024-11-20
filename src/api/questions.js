import axiosInstance from "./axiosInstance";

const apiUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL;

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

export const createQuestion = async (questionData) => {
  const formData = new FormData();

  formData.append(
    "data",
    JSON.stringify({
      title: questionData.title,
      body: questionData.body,
      tagIds: questionData.tagIds,
    })
  );

  // Add media files if any
  if (questionData.mediaFiles && questionData.mediaFiles.length > 0) {
    questionData.mediaFiles.forEach((file) => {
      formData.append("mediaFiles", file);
    });
  }

  const response = await fetch(`${apiUrl}/api/questions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create question");
  }

  return await response.json(); // Return API response
};
