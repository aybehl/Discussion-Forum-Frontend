import { Box, Typography, Collapse } from "@mui/material";
import AuthorAvatar from "../../../components/AuthorAvatar";
import ContentHeader from "../../../components/ContentHeader";
import AnswerActions from "./AnswerActions";
import { voteContent } from "./../../../api/votes";
import { useState } from "react";
import EditAnswerModal from "./EditAnswerModal";
import DeleteAnswerModal from "./DeleteAnswerModal";
import CommentDetails from "./CommentDetails";

const AnswerDetails = ({ answer, onAnswerUpdated }) => {
  const userId = sessionStorage.getItem("userId");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleUpvote = async () => {
    if (!answer || answer.deleted) {
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
      console.error("Error upvoting answer:", error);
    }
  };

  const handleDownvote = async () => {
    if (!answer || answer.deleted) return;

    try {
      await voteContent({
        contentId: answer.answerId,
        contentType: "ANSWER",
        voteType: "DOWNVOTE",
        votedById: userId,
      });

      onAnswerUpdated();
    } catch (error) {
      console.error("Error downvoting answer:", error);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
    handleDeleteModalClose();
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
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
            color: answer.deleted ? "gray.dark" : "gray.light",
            fontStyle: answer.deleted ? "italic" : "normal", // Italic for deleted reason
            mb: 2,
          }}
        >
          {answer.deleted
            ? `This answer has been deleted: ${answer.deletedReason}`
            : answer.body}
        </Typography>
        <AnswerActions
          authorId={answer.author.userId}
          votes={answer.votes}
          commentCount={answer.comments?.length}
          onUpvote={handleUpvote}
          onDownvote={handleDownvote}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          isDisabled={answer.deleted}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />

        {/* Comments Section */}
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Box
          >
            {answer.comments.map((comment) => (
              <CommentDetails key={comment.commentId} comment={comment} onCommentUpdated={() => onAnswerUpdated()}/>
            ))}
          </Box>
        </Collapse>
        <EditAnswerModal
          open={isEditModalOpen}
          onClose={handleEditModalClose}
          answer={answer}
          onAnswerUpdated={onAnswerUpdated}
        />
        <DeleteAnswerModal
          open={isDeleteModalOpen}
          onClose={handleDeleteModalClose}
          answerId={answer.answerId}
          onAnswerUpdated={onAnswerUpdated}
          onEdit={handleEditClick}
          onAnswerDeleted={onAnswerUpdated}
        />
      </Box>
    </Box>
  );
};

export default AnswerDetails;
