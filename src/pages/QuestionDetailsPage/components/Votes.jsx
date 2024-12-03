import React from "react";
import { Box } from "@mui/material";
import IconWithCount from "../../../components/IconWithCount";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";

const Votes = ({ votes, answerCount, onUpvote, onDownvote }) => {
  const userVote = votes.userVote;

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
          icon={ThumbUpOffAltIcon}
          hoverIcon={ThumbUpIcon}
          count={votes.upvotes}
          onClick={onUpvote}
          label=""
          iconColor={userVote === "UPVOTE" ? "primary.main": null}
        />
        <IconWithCount
          icon={ThumbDownOffAltIcon}
          hoverIcon={ThumbDownIcon}
          count={votes.downvotes}
          onClick={onDownvote}
          label=""
          iconColor={userVote === "DOWNVOTE" ? "primary.main": null}
        />
      </Box>
      <IconWithCount
        icon={CommentRoundedIcon}
        count={answerCount}
        onClick={() => console.log("Answers clicked")}
        label=""
      />
    </Box>
  );
};

export default Votes;
