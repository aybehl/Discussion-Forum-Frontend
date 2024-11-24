import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { formatISODate } from "../../../utils/dateUtils";

const QuestionHeader = ({ question }) => {
  return (
    <Box
    sx={{
      pt: 1
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "normal",
          color: "common.white",
        }}
      >
        {`@${question.author.username}`}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "gray.light",
        }}
      >
        {formatISODate(question.createdAt)}
      </Typography>
    </Box>
  </Box>
  );
};

export default QuestionHeader;
