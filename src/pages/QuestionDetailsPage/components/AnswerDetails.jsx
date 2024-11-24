import { Box, Typography } from "@mui/material";
import AuthorAvatar from "../../../components/AuthorAvatar";
import ContentHeader from "../../../components/ContentHeader";
import AnswerActions from "./AnswerActions";

const AnswerDetails = ({ answer}) => {
  const userId = sessionStorage.getItem("userId");

  const handleUpvote = async () => {
    if(!answer){
      return;
    }

    try {
      await voteContent({
        contentId: answer.answerId,
        contentType: "ANSWER",
        voteType: "UPVOTE",
        votedById: userId,
      });
      setRefreshKey((prev) => prev + 1);
    } catch(error){
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
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error downvoting question:", error);
    }
  };

  return (
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          alignItems: "flex-start",
        }}
      >
        <AuthorAvatar content={answer} width={40} height={40}/>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "0.5rem",
            flex: 1,
            borderBottom: "1px solid",
            borderColor: "gray.darker",
            width: "100%"
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
          <AnswerActions votes={answer.votes} commentCount={answer.comments?.length} onUpvote={handleUpvote} onDownvote={handleDownvote}/>
        </Box>
      </Box>
  );
};

export default AnswerDetails;
