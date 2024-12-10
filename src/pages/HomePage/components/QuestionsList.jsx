import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, IconButton } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import FiltersAndActions from "./FiltersAndActions";
import QuestionItem from "./QuestionItem";
import { getAllQuestions, getQuestionsByTags } from "../../../api/questions";
import CustomButton from "../../../components/CustomButton";
import AskQuestionModal from "./AskQuestionModal";

const QuestionsList = () => {
  const pageSize = 6;

  // State for questions and filtering
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  // State for pagination, modal, and sorting
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ column: null, direction: "asc" });

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

        const newQuestions =
          currentPage === 0 ? data.content : [...questions, ...data.content];
        setQuestions(newQuestions);
        setFilteredQuestions(newQuestions); // Reset filteredQuestions
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
    setSelectedTag(event.target.value);
    setCurrentPage(0);
  };

  const handleLoadMore = () => {
    if (!isLastPage) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSort = (column) => {
    const direction =
      sortConfig.column === column && sortConfig.direction === "asc"
        ? "desc"
        : "asc";

    setSortConfig({ column, direction });

    const sortedQuestions = [...filteredQuestions].sort((a, b) => {
      if (column === "likes") {
        return direction === "asc" ? a.upvotes - b.upvotes : b.upvotes - a.upvotes;
      } else if (column === "replies") {
        return direction === "asc" ? a.noOfReplies - b.noOfReplies : b.noOfReplies - a.noOfReplies;
      } else if (column === "postedOn") {
        return direction === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

    setFilteredQuestions(sortedQuestions);
  };

  const getIconRotation = (column) =>
    sortConfig.column === column && sortConfig.direction === "desc" ? 180 : 0;

  return (
    <Box
      sx={{
        pl: 4,
        mr: 8,
        width: "100%",
        borderLeft: "1px solid",
        borderColor: "gray.darker",
      }}
    >
      <FiltersAndActions
        onFilterChange={handleFilterChange}
        selectedTag={selectedTag}
        onAskQuestion={() => setIsModalOpen(true)}
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
        <Typography variant="body2" fontWeight="bold" sx={{ pl: 3 }}>
          Question
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="body2" fontWeight="bold">
            Likes
          </Typography>
          <IconButton onClick={() => handleSort("likes")}>
            <KeyboardArrowDown
              sx={{
                transition: "transform 0.3s ease",
                transform: `rotate(${getIconRotation("likes")}deg)`,
                color: "common.white",
                fontSize: "1rem"
              }}
            />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="body2" fontWeight="bold">
            Replies
          </Typography>
          <IconButton onClick={() => handleSort("replies")}>
            <KeyboardArrowDown
              sx={{
                transition: "transform 0.3s ease",
                transform: `rotate(${getIconRotation("replies")}deg)`,
                color: "common.white",
                fontSize: "1rem"
              }}
            />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="body2" fontWeight="bold">
            Posted On
          </Typography>
          <IconButton onClick={() => handleSort("postedOn")}>
            <KeyboardArrowDown
              sx={{
                transition: "transform 0.3s ease",
                transform: `rotate(${getIconRotation("postedOn")}deg)`,
                color: "common.white",
                fontSize: "1rem"
              }}
            />
          </IconButton>
        </Box>
      </Box>
      {filteredQuestions.map((question) => (
        <QuestionItem key={question.questionId} question={question} />
      ))}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          !isLastPage && (
            <CustomButton
              variant="outlined"
              bgColor="primary"
              textColor="gray.lighter"
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
      <AskQuestionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onQuestionPosted={(newQuestion) => {
          setQuestions((prevQuestions) => [newQuestion, ...prevQuestions]); // Prepend the new question
          setFilteredQuestions((prevQuestions) => [newQuestion, ...prevQuestions]);
          setIsLastPage(false); // Reset pagination flag if needed
        }}
      />
    </Box>
  );
};

export default QuestionsList;
