import { Box, Typography } from "@mui/material";
import AuthorAvatar from "../../../components/AuthorAvatar";
import ContentHeader from "../../../components/ContentHeader";
import AnswerActions from "./AnswerActions";
import { voteContent } from "./../../../api/votes";

const AnswerDetails = ({ answer, onAnswerUpdated }) => {
  const userId = sessionStorage.getItem("userId");
  
  const handleUpvote = async () => {
    if (!answer) {
      return;
    }
    
    try {
      await voteContent({
        contentId: answer.answerId,
        contentType: "ANSWER",
        voteType: "UPVOTE",
        votedById: userId,
      });

      onAnswerUpdated();
    } catch (error) {
      console.error("Error upvoting question:", error);
    }
  };

  const handleDownvote = async () => {
    if (!answer) return;
    
    try {
      await voteContent({
        contentId: answer.answerId,
        contentType: "ANSWER",
        voteType: "DOWNVOTE",
        votedById: userId,
      });

      onAnswerUpdated();
    } catch (error) {
      console.error("Error downvoting question:", error);
    }
  };

  const handleDeleteClick = () => {
    console.log("delete answer");
  };

  const handleEditClick = () => {
    console.log("edit answer");
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      <AuthorAvatar
        width={40}
        height={40}
        username={answer.author?.username}
        profilePicUrl={answer.author?.profilePic?.mediaUrl}
        margin={"0.5rem 0"}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "0.5rem",
          flex: 1,
        }}
      >
        <ContentHeader content={answer} />
        <Typography
          variant="body2"
          sx={{
            color: "gray.light",
            mb: 2,
          }}
        >
          {answer.body}
        </Typography>
        <AnswerActions
          authorId={answer.author.userId}
          votes={answer.votes}
          commentCount={answer.comments?.length}
          onUpvote={handleUpvote}
          onDownvote={handleDownvote}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          comments={answer.comments}
        />
      </Box>
    </Box>
  );
};

export default AnswerDetails;
