import React from "react";
import { Box } from "@mui/material";
import TagChips from "../../../components/TagChips";
import MediaCarousel from "../../../components/MediaCarousel";
import QuestionMenu from "./QuestionMenu";

const TagsAndActions = ({ question, onEdit, onDelete }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <TagChips tags={question.tags} />
      <MediaCarousel media={question.media} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <QuestionMenu
          authorId={question.author.userId}
          onEdit={onEdit}
          onDelete={onDelete}
          onBookmark={() => console.log("Bookmark Post Clicked")}
          onReport={() => console.log("Report Post Clicked")}
        />
      </Box>
    </Box>
  );
};

export default TagsAndActions;
