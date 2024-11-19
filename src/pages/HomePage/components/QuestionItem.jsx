import React from "react";
import { Box, Typography, Chip } from "@mui/material";

const QuestionItem = ({ question }) => {
  const { title, tags, likes, replies, postedOn } = question;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "3fr 1fr 1fr 1fr",
        gap: "1rem",
        alignItems: "center",
        py: 2,
        borderBottom: "1px solid #ddd",
      }}
    >
      <Box>
        <Typography variant="body1" fontWeight="bold">
          {title}
        </Typography>
        <Box sx={{ display: "flex", gap: "0.5rem", mt: 1 }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={`#${tag}`}
              size="small"
              sx={{
                backgroundColor: "gray.lighter",
                fontSize: "0.75rem",
              }}
            />
          ))}
        </Box>
      </Box>
      <Typography variant="body2" textAlign="center">
        {likes}
      </Typography>
      <Typography variant="body2" textAlign="center">
        {replies}
      </Typography>
      <Typography variant="body2" textAlign="center">
        {postedOn}
      </Typography>
    </Box>
  );
};

export default QuestionItem;
