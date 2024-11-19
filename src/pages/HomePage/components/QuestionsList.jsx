import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import FiltersAndActions from "./FiltersAndActions";
import QuestionItem from "./QuestionItem";
import { getAllQuestions, getQuestionsByTags } from "../../../api/questions";
import CustomButton from "../../../components/CustomButton";

const QuestionsList = () => {
  const pageSize = 6;
  const [questions, setQuestions] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);

      try {
        const data =
          selectedTag === ""
            ? await getAllQuestions(currentPage, pageSize)
            : await getQuestionsByTags(
                [selectedTag.tagId],
                currentPage,
                pageSize
              );

        setQuestions((prevQuestions) =>
          currentPage === 0 ? data.content : [...prevQuestions, ...data.content]
        );
        setIsLastPage(data.last);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [currentPage, selectedTag]);

  const handleFilterChange = (event) => {
    console.log("event - ", event);
    setSelectedTag(event.target.value);
    setCurrentPage(0);
  };

  const handleLoadMore = () => {
    if (!isLastPage) setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <Box sx={{ pl: 4, mr: 8, width: "100%", borderLeft: "1px solid",
      borderColor: "gray.darker", }}>
      <FiltersAndActions
        onFilterChange={handleFilterChange}
        selectedTag={selectedTag}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr 1fr 1fr",
          gap: "1rem",
          pt: 2,
          pb: 1,
          borderBottom: "1px solid",
          borderColor: "gray.darker",
        }}
      >
        <Typography variant="body2" fontWeight="bold" sx={{pl: 3}}>
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
      {questions.map((question) => (
        <QuestionItem key={question.questionId} question={question} />
      ))}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          !isLastPage && (
            // <Button variant="outlined" onClick={handleLoadMore}>
            //   Load More
            // </Button>
            <CustomButton
              variant="contained"
              bgColor="primary"
              textColor="common.white"
              size="small"
              padding={"0.5rem 1rem"}
              borderRadius={"0.5rem"}
              content={"Load More"}
              onClick={handleLoadMore}
              textVariant="outlined"
            />
          )
        )}
      </Box>
    </Box>
  );
};

export default QuestionsList;
