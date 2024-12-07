import { Box, Typography } from "@mui/material";
import AuthorAvatar from "../../../components/AuthorAvatar";
import ContentHeader from './../../../components/ContentHeader';
import CommentActions from "./CommentActions";
import { useState } from "react";
import { voteContent } from "../../../api/votes";

const CommentDetails = ({ comment, onCommentUpdated, setIsExpanded }) => {
  const userId = sessionStorage.getItem("userId");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleUpvote = async () => {
    if (!comment || comment.deleted) {
      return;
    }

    try {
      await voteContent({
        contentId: comment.commentId,
        contentType: "COMMENT",
        voteType: "UPVOTE",
        votedById: userId,
      });

      onCommentUpdated();
      setIsExpanded(true);
    } catch (error) {
      console.error("Error upvoting comment:", error);
    }
  };

  const handleDownvote = async () => {
    if (!comment || comment.deleted) {
      return;
    }

    try {
      await voteContent({
        contentId: comment.commentId,
        contentType: "COMMENT",
        voteType: "DOWNVOTE",
        votedById: userId,
      });

      onCommentUpdated();
      setIsExpanded(true);
    } catch (error) {
      console.error("Error downvoting comment:", error);
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
      }}
    >
      <AuthorAvatar
        width={30}
        height={30}
        username={comment.author?.username}
        profilePicUrl={comment.author?.profilePic?.mediaUrl}
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

        <ContentHeader content={comment} />
        <Typography
          variant="body2"
          sx={{
            color: comment.deleted ? "gray.dark" : "gray.light",
            fontStyle: comment.deleted ? "italic" : "normal", // Italic for deleted reason
            mb: 2,
          }}
        >
          {comment.deleted
            ? `This comment has been deleted: ${comment.deletedReason}`
            : comment.body}
        </Typography>

        <CommentActions
          authorId={comment.author.userId}
          votes={comment.votes}
          onUpvote={handleUpvote}
          onDownvote={handleDownvote}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          isDisabled={comment.deleted}
        />
      </Box>
    </Box>
  );
};

export default CommentDetails;
