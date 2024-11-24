import React from "react";
import { Box, Typography } from "@mui/material";

const QuestionBody = ({ question }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontWeight: "bold",
          color: "common.white",
        }}
      >
        {question.title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "gray.light",
        }}
      >
        {question.body}
      </Typography>
    </Box>
  );
};

export default QuestionBody;
