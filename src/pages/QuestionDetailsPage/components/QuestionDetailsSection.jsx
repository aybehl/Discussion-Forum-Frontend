import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Alert,
} from "@mui/material";
import { getQuestionDetails } from "../../../api/questions";
import CustomButton from "../../../components/CustomButton";
//import TextInput from "../../../components/TextInput";
import { useUser } from "../../../contexts/UserProvider";
import { formatISODate } from "../../../utils/dateUtils";
import TagChips from "../../../components/TagChips";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import IconWithCount from "../../../components/IconWithCount";

const QuestionDetailsSection = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newAnswer, setNewAnswer] = useState(""); // Input for new answer
  const { user } = useUser();

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      setIsLoading(true);
      try {
        const data = await getQuestionDetails(questionId, user?.userId);
        setQuestion(data);
      } catch (error) {
        console.error("Error fetching question details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (questionId) fetchQuestionDetails();
  }, [questionId]);

  const handlePostAnswer = async () => {
    console.log("Posting answer:", newAnswer);
    // Implement API call for posting the answer
    setNewAnswer(""); // Clear input after posting
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
        pt: 1,
        pl: 4,
        mr: 8,
        width: "100%",
        borderLeft: "1px solid",
        borderColor: "gray.darker",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {/* Question Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box display="flex" alignItems="center" gap="0.25rem">
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
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "normal", color: "common.white" }}
          >
            {`@${question.author.username}`}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: "gray.light",
          }}
        >
          {formatISODate(question.createdAt)}
        </Typography>
      </Box>

      {/* Question Title and Body */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color: "common.white",
          }}
        >
          {question.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "gray.light",
          }}
        >
          {question.body}
        </Typography>
      </Box>

      {/* Tags */}
      <TagChips tags={question.tags} />

      {/* Votes */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "0.5px solid",
          borderBottom: "0.5px solid",
          borderColor: "gray.darker",
          py: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <IconWithCount
            icon={ThumbUpOffAltIcon}
            hoverIcon={ThumbUpIcon}
            count={question.votes.upvotes}
            onClick={() => console.log("Upvote clicked")}
            label=""
          />
          <IconWithCount
            icon={ThumbDownOffAltIcon}
            hoverIcon={ThumbDownIcon}
            count={question.votes.downvotes}
            onClick={() => console.log("Downvote clicked")}
            label=""
          />
        </Box>
        <IconWithCount
          icon={CommentRoundedIcon}
          count={question.answers.length}
          onClick={() => console.log("Answers clicked")}
          label=""
        />
      </Box>

      {/* Answers */}
      {question.answers.map((answer) => (
        <Box
          key={answer.answerId}
          sx={{
            borderBottom: "1px solid",
            borderColor: "gray.darker",
            py: 2,
          }}
        >
          <Box display="flex" alignItems="center" gap="0.5rem" mb={1}>
            <Avatar
              {...(answer.author?.profilePic?.mediaUrl
                ? { src: answer.author?.profilePic?.mediaUrl }
                : {
                    children: answer.author?.username?.charAt(0).toUpperCase(),
                  })}
              sx={{
                width: 40,
                height: 40,
                backgroundColor: !answer.author.profilePic
                  ? "primary.main"
                  : "transparent",
              }}
            />
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              {answer.author.username}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "gray.light",
              }}
            >
              {new Date(answer.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "2-digit",
              })}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: "gray.light",
              mb: 1,
            }}
          >
            {answer.body}
          </Typography>
        </Box>
      ))}

      {/* Add New Answer */}
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          borderTop: "1px solid",
          borderColor: "gray.darker",
          pt: 2,
        }}
      >
        <Avatar
          {...(user?.profilePic
            ? { src: user.profilePic }
            : { children: user?.username?.charAt(0).toUpperCase() || "G" })}
          sx={{
            width: 40,
            height: 40,
            backgroundColor: user?.profilePic
              ? "transparent"
              : "primary.main",
          }}
        />
        <TextInput
          label=""
          placeholder="Got thoughts? Share them here!"
          value={newAnswer}
          onChange={(value) => setNewAnswer(value)}
          multiline
          rows={2}
        />
        <CustomButton
          variant="contained"
          content="Post"
          onClick={handlePostAnswer}
        />
      </Box> */}
    </Box>
  );
};

export default QuestionDetailsSection;
