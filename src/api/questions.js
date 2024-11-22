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

export const getQuestionDetails = async (questionId, userId) => {
  try {
    const response = await axiosInstance.get(`/api/questions/${questionId}`, {
      headers: {
        userId: userId || null,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching question details:", error);
    throw error;
  }
};

export const updateQuestion = async (questionId, updatedData) => {
  const formData = new FormData();

  // Append JSON data for the question
  formData.append(
    "data",
    JSON.stringify({
      title: updatedData.title,
      body: updatedData.body,
      tagsToDelete: updatedData.tagsToDelete,
      newTagIds: updatedData.newTagIds,
      mediaToDelete: updatedData.mediaToDelete, // Array of media IDs to delete
    })
  );

  // Append new media files, if any
  if (updatedData.newMediaFiles && updatedData.newMediaFiles.length > 0) {
    updatedData.newMediaFiles.forEach((file) => {
      formData.append("newMediaFiles", file);
    });
  }

  const response = await fetch(`${apiUrl}/api/questions/${questionId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    },
    body: formData,
  });

  // Handle errors
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update question");
  }

  return await response.json(); // Return API response
};

