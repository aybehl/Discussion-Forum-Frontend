import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Alert, Avatar } from "@mui/material";
import { getQuestionDetails } from "../../../api/questions";
import { useUser } from "../../../contexts/UserProvider";
import QuestionHeader from "./QuestionHeader";
import QuestionBody from "./QuestionBody";
import TagsAndActions from "./TagsAndActions";
import Votes from "./Votes";
import AnswerList from "./AnswerList";
import EditQuestionModal from "./EditQuestionModal";
import DeleteQuestionModal from "./DeleteQuestionModal";
import { voteContent } from "../../../api/votes";

const QuestionDetailsSection = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const userId = sessionStorage.getItem("userId");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      setIsLoading(true);
      try {
        const data = await getQuestionDetails(questionId, userId);
        setQuestion(data);
      } catch (error) {
        console.error("Error fetching question details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (questionId) fetchQuestionDetails();
  }, [questionId, refreshKey]);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
    handleDeleteModalClose();
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleQuestionUpdated = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleUpvote = async () => {
    if(!user || !question){
      return;
    }

    try {
      await voteContent({
        contentId: questionId,
        contentType: "QUESTION",
        voteType: "UPVOTE",
        votedById: userId,
      });
      setRefreshKey((prev) => prev + 1);
    } catch(error){
      console.error("Error upvoting question:", error);
    }
  };

  const handleDownvote = async () => {
    if (!user || !question) return;

    try {
      await voteContent({
        contentId: questionId,
        contentType: "QUESTION",
        voteType: "DOWNVOTE",
        votedById: userId,
      });
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error downvoting question:", error);
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          overflowY: "auto",
          borderLeft: "1px solid",
          borderColor: "gray.darker",
          width: "100%",
          pt: 2,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!question) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          overflowY: "auto",
          borderLeft: "1px solid",
          borderColor: "gray.darker",
          width: "100%",
          pt: 2,
        }}
      >
        <Alert severity="error">
          This Question does not exist. Please click on 'All Questions' on the
          left sidebar
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        pt: 4,
        pl: 4,
        mr: 8,
        width: "100%",
        borderLeft: "1px solid",
        borderColor: "gray.darker",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          alignItems: "flex-start",
        }}
      >
        <Avatar
          {...(question.author?.profilePic?.mediaUrl
            ? { src: question.author?.profilePic?.mediaUrl }
            : {
                children: question.author?.username?.charAt(0).toUpperCase(),
              })}
          sx={{
            width: 50,
            height: 50,
            backgroundColor: !question.author.profilePic
              ? "primary.main"
              : "transparent",
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            flex: 1,
          }}
        >
          <QuestionHeader question={question} />
          <QuestionBody question={question} />
          <TagsAndActions
            question={question}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
          <Votes votes={question.votes} answerCount={question.answers.length} onUpvote={handleUpvote} onDownvote={handleDownvote}/>
          <AnswerList answers={question.answers} />
          <EditQuestionModal
            open={isEditModalOpen}
            onClose={handleEditModalClose}
            questionId={questionId}
            question={question}
            onQuestionUpdated={handleQuestionUpdated}
          />
          <DeleteQuestionModal
            open={isDeleteModalOpen}
            onClose={handleDeleteModalClose}
            onEdit={handleEditClick}
            questionId={questionId}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionDetailsSection;
