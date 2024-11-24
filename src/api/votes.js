import axiosInstance from "./axiosInstance";

export const voteContent = async ({ contentId, contentType, voteType, votedById }) => {
  try {
    const response = await axiosInstance.post(
      `/api/votes`,
      {
        votedById,
        contentId,
        contentType,
        voteType,
      },
    );
    return response.data;
  } catch (error ){
    console.error("Error occurred when calling /api/votes", error);
    throw error;
  }

};
