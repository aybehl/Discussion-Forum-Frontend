import React from "react";
import { Box } from "@mui/material";
import TagChips from "../../../components/TagChips";
import MediaCarousel from "../../../components/MediaCarousel";
import ContentMenu from "./ContentMenu";

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
        <ContentMenu
          authorId={question.author.userId}
          onEdit={onEdit}
          onDelete={onDelete}
          editText={"Edit Post"}
          deleteText={"Delete Post"}
          onBookmark={() => console.log("Bookmark Post Clicked")}
          onReport={() => console.log("Report Post Clicked")}
          bookmarkText={"Bookmark Question"}
          reportText = {"Report Question"}
        />
      </Box>
    </Box>
  );
};

export default TagsAndActions;
