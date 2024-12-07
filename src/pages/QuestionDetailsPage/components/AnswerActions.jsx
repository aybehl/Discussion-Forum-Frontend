import { Box, IconButton, Typography } from "@mui/material";
import IconWithCount from "../../../components/IconWithCount";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import ContentMenu from "./ContentMenu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AnswerActions = ({
  authorId,
  votes,
  commentCount,
  onUpvote,
  onDownvote,
  onEdit,
  onDelete,
  isDisabled,
  isExpanded,
  setIsExpanded,
  setIsCommenting,
}) => {
  const userVote = votes.userVote;

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
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
          icon={CommentRoundedIcon}
          count={commentCount}
          label=""
        />
        <IconButton
          onClick={handleToggleExpand}
          sx={{
            transform:
              !isDisabled && isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            color: "gray.light",
            p: 0,
            cursor: isDisabled ? "not-allowed" : "pointer",
          }}
        >
          <ExpandMoreIcon />
        </IconButton>

        <Typography
          onClick={isDisabled? null: () => setIsCommenting(true)}
          sx={{
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: "500",
            color: isDisabled ? "gray.dark" : "gray.light",
            cursor: isDisabled ? "not-allowed" : "pointer",
            "&:hover": !isDisabled && {
              color: "primary.main",
              textDecoration: "underline",
            },
            borderLeft: "1px solid",
            borderColor: "gray.dark",
            paddingLeft: "0.5rem",
          }}
        >
          Comment
        </Typography>
      </Box>
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
          editText={"Edit Answer"}
          deleteText={"Delete Answer"}
          onBookmark={() => console.log("Bookmark Answer Clicked")}
          onReport={() => console.log("Report Answer Clicked")}
          bookmarkText={"Bookmark Answer"}
          reportText={"Report Answer"}
          disabled={isDisabled}
        />
      </Box>
    </Box>
  );
};

export default AnswerActions;
