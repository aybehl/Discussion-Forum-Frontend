import { Box } from "@mui/material";
import IconWithCount from "../../../components/IconWithCount";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ContentMenu from "./ContentMenu";

const CommentActions = ({
  authorId,
  votes,
  onUpvote,
  onDownvote,
  onEdit,
  onDelete,
  isDisabled,
}) => {
  const userVote = votes.userVote;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        borderBottom: "0.5px solid",
        borderColor: "gray.darker",
        py: "0.5rem",
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
          count={votes.upvotes}
          onClick={onUpvote}
          label=""
          iconColor={userVote === "UPVOTE" ? "primary.main" : null}
          disabled={isDisabled}
        />
        <IconWithCount
          icon={ThumbDownOffAltIcon}
          hoverIcon={ThumbDownIcon}
          count={votes.downvotes}
          onClick={onDownvote}
          label=""
          iconColor={userVote === "DOWNVOTE" ? "primary.main" : null}
          disabled={isDisabled}
        />
        <ContentMenu
          authorId={authorId}
          onEdit={onEdit}
          onDelete={onDelete}
          editText={"Edit Comment"}
          deleteText={"Delete Comment"}
          onBookmark={() => console.log("Bookmark Comment Clicked")}
          onReport={() => console.log("Report Comment Clicked")}
          bookmarkText={"Bookmark Comment"}
          reportText = {"Report Comment"}
          disabled={isDisabled}
        />
      </Box>
    </Box>
  );
};

export default CommentActions;
