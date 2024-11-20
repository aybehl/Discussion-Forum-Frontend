import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { formatISODate } from "../../../utils/dateUtils";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";

const QuestionItem = ({ question }) => {
  const { title, tags, upvotes, noOfReplies, createdAt } = question;
  const theme = useTheme();

  return (
    <Box
      component={Link}
      to={`/questions/${question.questionId}`}
      style={{ textDecoration: "none" }}
      sx={{
        display: "grid",
        gridTemplateColumns: "3fr 1fr 1fr 1fr",
        gap: "1rem",
        alignItems: "center",
        py: 2,
        borderBottom: "0.5px solid",
        borderColor: 'gray.darker',
        color: "common.white",
        "&:hover": {
          background: `linear-gradient(135deg, ${theme.palette.common.black} 30%, ${theme.palette.gray.darkest} 90%)`,
          color: "primary.main", // Hover color
          transition: "background 1s"
        },
      }}
    >
      <Box sx={{pl: 3}}>
        <Typography variant="subtitle2" sx={{fontWeight: 300}} >
          {title}
        </Typography>
        <Box sx={{ display: "flex", gap: "0.5rem", mt: 1 }}>
          {tags.map((tag) => (
            <Chip
              key={tag.tagId}
              label={`#${tag.tagName}`}
              size="small"
              sx={{
                backgroundColor: "primary.main",
                fontSize: "0.75rem",
                color: "common.white"
              }}
            />
          ))}
        </Box>
      </Box>
      <Typography variant="subtitle2" textAlign="center" sx={{fontWeight: 300}}>
        {upvotes}
      </Typography>
      <Typography variant="subtitle2" textAlign="center" sx={{fontWeight: 300}}>
        {noOfReplies}
      </Typography>
      <Typography variant="subtitle2" textAlign="center" sx={{fontWeight: 300}}>
        {formatISODate(createdAt)}
      </Typography>
    </Box>
  );
};

export default QuestionItem;
