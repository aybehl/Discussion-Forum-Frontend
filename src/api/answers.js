import axiosInstance from "./axiosInstance";

// export const postAnswer = async ({ body, questionId }) => {
//   try {
//     const response = await axiosInstance.post(
//       `api/answers`,
//       { body, questionId },
//     );
  
//     return response.data;
//   } catch(error) {
//     console.error("Error creating a new answer:", error);
//     throw error;
//   }
// };

export const postAnswer = async ({ body, questionId }) => {
  try {
    console.log("Sending payload to API:", { body, questionId });
    const response = await axiosInstance.post(`api/answers`, { body, questionId });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};
