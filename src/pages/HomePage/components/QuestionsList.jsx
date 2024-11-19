import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import FiltersAndActions from "./FiltersAndActions";
import QuestionItem from "./QuestionItem";

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedTag, setSelectedTag] = useState("Tags");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Replace this with your API call.
        const response = [
          {
            id: 1,
            title: "What are the best exercises to improve core strength?",
            tags: ["Core Strength", "Workout", "Fitness"],
            likes: 100,
            replies: 6,
            postedOn: "12th Sep 24",
          },
          {
            id: 2,
            title: "How to create a yoga routine for beginners?",
            tags: ["Yoga", "Fitness"],
            likes: 45,
            replies: 3,
            postedOn: "10th Sep 24",
          },
        ];
        setQuestions(response);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleFilterChange = (event) => {
    setSelectedTag(event.target.value);
  };

  const filteredQuestions =
    selectedTag === "Tags"
      ? questions
      : questions.filter((q) => q.tags.includes(selectedTag));

  return (
    <Box sx={{ pl: 4, mr: 8, width: "100%" }}>
      <FiltersAndActions
        onFilterChange={handleFilterChange}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr 1fr 1fr",
          gap: "1rem",
          py: 2,
          borderBottom: "2px solid #000",
        }}
      >
        <Typography variant="body2" fontWeight="bold">
          Question
        </Typography>
        <Typography variant="body2" fontWeight="bold" textAlign="center">
          Likes
        </Typography>
        <Typography variant="body2" fontWeight="bold" textAlign="center">
          Replies
        </Typography>
        <Typography variant="body2" fontWeight="bold" textAlign="center">
          Posted On
        </Typography>
      </Box>
      {filteredQuestions.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </Box>
  );
};

export default QuestionsList;
