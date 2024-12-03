import { Box, IconButton } from "@mui/material";
import IconWithCount from "../../../components/IconWithCount";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import ContentMenu from "./ContentMenu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useState} from "react";

const AnswerActions = ({
  authorId,
  votes,
  commentCount,
  onUpvote,
  onDownvote,
  onEdit,
  onDelete,
  comments,
}) => {
  const userVote = votes.userVote;
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: "0.5px solid",
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
          onClick={() => console.log("Answers clicked")}
          label=""
        />
        <IconButton
          onClick={handleToggleExpand}
          sx={{
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            color: "gray.light",
            p: 0
          }}
        >
          <ExpandMoreIcon/>
        </IconButton>
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
        />
        <IconWithCount
          icon={ThumbDownOffAltIcon}
          hoverIcon={ThumbDownIcon}
          count={votes.downvotes}
          onClick={onDownvote}
          label=""
          iconColor={userVote === "DOWNVOTE" ? "primary.main" : null}
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
          reportText = {"Report Answer"}
        />
      </Box>
    </Box>
  );
};

export default AnswerActions;
